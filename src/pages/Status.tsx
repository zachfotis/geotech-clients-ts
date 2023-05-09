import { format } from 'date-fns';
import { collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Payment, Project, Worksheet } from '../types';

function Status() {
  const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [Payment, setPayment] = useState<Payment[]>([]);

  useEffect(() => {
    fetchFromDB<Project>('projects', setProjects, undefined, { DOC_KEY: 'date', ORDER: 'desc' });
  }, []);

  type Query = {
    DOC_KEY: string;
    VALUE: number[] | string[];
  };

  type Order = {
    DOC_KEY: string;
    ORDER: 'asc' | 'desc';
  };

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

  return (
    <section className="profile-section">
      <h1>Project Status</h1>
      <div className="overflow-x-auto w-full mt-10">
        {/* grid collumns fit content */}
        <div className="grid grid-cols-[max-content_max-content_1fr_max-content_max-content_max-content_max-content] gap-x-7 gap-y-2">
          <div className="font-bold mb-3">ID</div>
          <div className="font-bold mb-3 text-center">Date</div>
          <div className="font-bold mb-3">Project</div>
          <div className="font-bold mb-3 text-center">Deliverables</div>
          <div className="font-bold mb-3 text-center">Worksheet</div>
          <div className="font-bold mb-3 text-center">Payment</div>
          <div className="font-bold mb-3 text-center">Actions</div>
          {projects.map((project) => (
            <div key={project.id} className="contents">
              <p>{project.id}</p>
              <p className="text-center">{format(new Date(project.date), 'LLL dd, yyyy')}</p>
              <div className="flex flex-col justify-start items-start gap-0 truncate">
                <p>{project.companyName}</p>
                <p className="text-xs text-gray-500">{project.title}</p>
              </div>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-center">-</p>
              <p className="text-center">No action</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Status;
