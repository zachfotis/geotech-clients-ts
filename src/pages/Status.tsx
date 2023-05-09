import { format } from 'date-fns';
import { collection, getCountFromServer, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Event, Payment, Project, Worksheet } from '../types';

type Query = {
  DOC_KEY: string;
  VALUE: number[] | string[];
};

type Order = {
  DOC_KEY: string;
  ORDER: 'asc' | 'desc';
};

type Deliverable = {
  projectID: number;
  count: number;
};

type PaymentStatus = {
  projectID: number;
  amountPaid: number;
};

function Status() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus[]>([]);
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);

  useEffect(() => {
    deliverables.length = 0;
    fetchFromDB<Project>('projects', setProjects, undefined, { DOC_KEY: 'date', ORDER: 'desc' });
  }, []);

  useEffect(() => {
    fetchFromDB<Worksheet>('worksheets', setWorksheets);
    fetchFromDB<Payment>('payments', setPayments);

    for (const project of projects) {
      getDeliverables(project);
    }
  }, [projects]);

  useEffect(() => {
    if (payments.length > 0) {
      for (const payment of payments) {
        getPaymentEvents(payment);
      }
    }
  }, [payments]);

  const fetchFromDB = async <T,>(
    collectionName: string,
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    userQuery?: Query,
    userOrder?: Order
  ) => {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, collectionName);
      const q1 = userQuery?.DOC_KEY ? where(userQuery.DOC_KEY, 'in', userQuery.VALUE) : null;
      const order = userOrder?.DOC_KEY ? orderBy(userOrder.DOC_KEY, userOrder.ORDER) : null;

      let data: T[] = [];

      if (q1) {
        const queryRef = query(collectionRef, q1);
        const dataSnap = await getDocs(queryRef);
        data = dataSnap.docs.map((doc) => doc.data()) as T[];
      } else if (order) {
        const queryRef = query(collectionRef, order);
        const dataSnap = await getDocs(queryRef);
        data = dataSnap.docs.map((doc) => doc.data()) as T[];
      } else {
        const dataSnap = await getDocs(collectionRef);
        data = dataSnap.docs.map((doc) => doc.data()) as T[];
      }

      setter(data);
    } catch (error) {
      console.log(error);
    }
  };

  const countFromDB = async (collectionName: string, userQuery?: Query) => {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, collectionName);
      const q1 = userQuery?.DOC_KEY ? where(userQuery.DOC_KEY, 'in', userQuery.VALUE) : null;

      let data: number = 0;

      if (q1) {
        const queryRef = query(collectionRef, q1);
        const dataSnap = await getCountFromServer(queryRef);
        data = dataSnap.data().count;
      } else {
        const dataSnap = await getCountFromServer(collectionRef);
        data = dataSnap.data().count;
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getWorksheet = (project: Project) => {
    const worksheet = worksheets.find((worksheet) => worksheet.projectID === project.id);
    if (worksheet) {
      return (
        <Link
          className="text-green-500"
          to={`/dashboard/worksheet`}
          state={projects.find((project) => project.id === worksheet.projectID)}
        >
          Yes
        </Link>
      );
    } else {
      return <span>-</span>;
    }
  };

  const getPayment = (project: Project) => {
    const payment = payments.find((payment) => payment.projectID === project.id);

    if (payment) {
      const paidAmount = paymentStatus.find((status) => status.projectID === project.id)?.amountPaid;
      const totalAmount = payment.totalAmount;

      let color = 'text-red-500';
      if (paidAmount) {
        color = paidAmount >= payment.totalAmount ? 'text-green-500' : 'text-red-500';
      }

      return (
        <Link
          className={color}
          to={`/dashboard/payment`}
          state={projects.find((project) => project.id === payment.projectID)}
        >
          {paidAmount} / {totalAmount}
        </Link>
      );
    } else {
      return <span>-</span>;
    }
  };

  const getPaymentEvents = async (payment: Payment) => {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'events');
      const q1 = where('paymentID', '==', payment.id);
      const queryRef = query(collectionRef, q1);
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => doc.data()) as Event[];

      const amountPaid = data.reduce((acc, curr) => acc + curr.amount, 0);
      setPaymentStatus((prev) => [...prev, { projectID: payment.projectID, amountPaid }]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeliverables = async (project: Project) => {
    const count = await countFromDB('files', { DOC_KEY: 'projectRef', VALUE: [project.id] });
    if (count) {
      setDeliverables((prev) => [...prev, { projectID: project.id, count }]);
    }
  };

  return (
    <section className="profile-section">
      <h1>Project Status</h1>
      <div className="overflow-x-auto w-full mt-10">
        <div className="grid grid-cols-[max-content_max-content_1fr_max-content_max-content_max-content] gap-x-10 gap-y-2">
          <div className="font-bold mb-3">ID</div>
          <div className="font-bold mb-3 text-center">Date</div>
          <div className="font-bold mb-3">Project</div>
          <div className="font-bold mb-3 text-center">Deliverables</div>
          <div className="font-bold mb-3 text-center">Worksheet</div>
          <div className="font-bold mb-3 text-center">Payment</div>
          {projects.map((project) => (
            <div key={project.id} className="contents">
              <p>{project.id}</p>
              <p className="text-center">{format(new Date(project.date), 'LLL dd, yyyy')}</p>
              <Link
                className="flex flex-col justify-start items-start gap-0 truncate"
                to={`/project/${project.id}`}
                state={project}
              >
                <p>{project.companyName}</p>
                <p className="text-xs text-gray-500">{project.title}</p>
              </Link>
              <Link className="text-center" to={`/project/${project.id}`} state={project}>
                {deliverables.find((deliverable) => deliverable.projectID === project.id)?.count}
              </Link>
              <p className="text-center">{getWorksheet(project)}</p>
              <p className="text-center">{getPayment(project)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Status;
