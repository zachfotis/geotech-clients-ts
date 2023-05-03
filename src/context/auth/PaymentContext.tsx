import { Timestamp, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Event, EventTypeEnum, Payment } from '../../types';
import { useFirebase } from './FirebaseContext';

type PaymentContextType = {
  paymentInfo: Payment;
  paymentInfoDispatch: React.Dispatch<ReducerActions>;
  fetchPaymentFromDB: (projectID: number) => Promise<void>;
  savePaymentToDB: () => Promise<void>;
  isPaymentSaveOnDB: boolean;
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
  saveEventToDB: () => Promise<void>;
  deleteEventFromDB: (eventID: string) => Promise<void>;
  deletePaymentFromDB: (paymentID: string) => Promise<void>;
};

export const createInitialState = (): Payment => {
  return {
    id: uuidv4(),
    projectID: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    totalAmount: 0,
    events: [],
  };
};

const createEventInitialState = (paymentID: string): Event => {
  return {
    id: uuidv4(),
    paymentID: paymentID,
    createdAt: new Date(),
    updatedAt: new Date(),
    eventDate: new Date(),
    amount: 0,
    type: EventTypeEnum.PAYMENT,
    comment: '',
  };
};

const PaymentContext = createContext<PaymentContextType>({
  paymentInfo: createInitialState(),
  paymentInfoDispatch: () => {},
  fetchPaymentFromDB: () => Promise.resolve(),
  savePaymentToDB: () => Promise.resolve(),
  isPaymentSaveOnDB: false,
  event: createEventInitialState(''),
  setEvent: () => {},
  saveEventToDB: () => Promise.resolve(),
  deleteEventFromDB: () => Promise.resolve(),
  deletePaymentFromDB: () => Promise.resolve(),
});

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};

type ReducerActions =
  | { type: 'SET_PROJECT_ID'; payload: number }
  | { type: 'RESET_PAYMENT' }
  | { type: 'SET_PAYMENT'; payload: Payment }
  | { type: 'SET_PAYMENT_UPDATE_DATE' }
  | { type: 'SET_TOTAL_AMOUNT'; payload: number }
  | { type: 'SET_EVENT'; payload: Event }
  | { type: 'SET_EVENTS'; payload: Event[] };

const reducer = (state: Payment, action: ReducerActions) => {
  switch (action.type) {
    case 'SET_PROJECT_ID':
      return { ...state, projectID: action.payload };
    case 'RESET_PAYMENT':
      return createInitialState();
    case 'SET_PAYMENT':
      return action.payload;
    case 'SET_PAYMENT_UPDATE_DATE':
      return { ...state, updatedAt: new Date() };
    case 'SET_TOTAL_AMOUNT':
      return { ...state, totalAmount: action.payload };
    case 'SET_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'SET_EVENTS':
      return { ...state, events: action.payload };
    default:
      return state;
  }
};

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const { setLoading } = useFirebase();
  const [paymentInfo, paymentInfoDispatch] = useReducer(reducer, createInitialState());
  const [event, setEvent] = useState<Event>(createEventInitialState(paymentInfo.id));
  const [isPaymentSaveOnDB, setIsPaymentSaveOnDB] = useState(false);

  useEffect(() => {
    setEvent(createEventInitialState(paymentInfo.id));
    fetchEventsFromDB(paymentInfo.id);
  }, [paymentInfo.id]);

  const fetchPaymentFromDB = async (projectID: number) => {
    paymentInfoDispatch({ type: 'RESET_PAYMENT' });
    setLoading(true);
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'payments');
      const q1 = where('projectID', '==', projectID);
      const queryRef = query(collectionRef, q1);
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => doc.data());

      if (data.length > 0 && data[0].projectID) {
        paymentInfoDispatch({
          type: 'SET_PAYMENT',
          payload: {
            ...paymentInfo,
            ...data[0],
            createdAt: new Date(new Timestamp(data[0].createdAt.seconds, data[0].createdAt.nanoseconds).toDate()),
            updatedAt: new Date(new Timestamp(data[0].updatedAt.seconds, data[0].updatedAt.nanoseconds).toDate()),
          } as Payment,
        });
        setIsPaymentSaveOnDB(true);
      } else {
        if (projectID) {
          paymentInfoDispatch({ type: 'RESET_PAYMENT' });
          paymentInfoDispatch({ type: 'SET_PROJECT_ID', payload: projectID });
        } else {
          toast.error('Project ID not found');
        }
        setIsPaymentSaveOnDB(false);
      }
    } catch (error) {
      setIsPaymentSaveOnDB(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const savePaymentToDB = async () => {
    // Update the updatedAt field
    paymentInfoDispatch({ type: 'SET_PAYMENT_UPDATE_DATE' });
    setLoading(true);
    try {
      const db = getFirestore();
      const docRef = doc(db, 'payments', paymentInfo.id);
      await setDoc(docRef, paymentInfo);
      toast.success('Payment saved successfully');
      setIsPaymentSaveOnDB(true);
    } catch (error: any) {
      if (error.hasOwnProperty('message')) {
        toast.error(error.message);
      }
      setIsPaymentSaveOnDB(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventsFromDB = async (paymentID: string) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'events');
      const q1 = where('paymentID', '==', paymentID);
      const queryRef = query(collectionRef, q1);
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => doc.data());
      if (data.length > 0) {
        paymentInfoDispatch({
          type: 'SET_EVENTS',
          payload: data.map((event) => {
            return {
              ...event,
              createdAt: new Date(new Timestamp(event.createdAt.seconds, event.createdAt.nanoseconds).toDate()),
              updatedAt: new Date(new Timestamp(event.updatedAt.seconds, event.updatedAt.nanoseconds).toDate()),
              eventDate: new Date(new Timestamp(event.eventDate.seconds, event.eventDate.nanoseconds).toDate()),
            } as Event;
          }),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const saveEventToDB = async () => {
    setLoading(true);
    try {
      const db = getFirestore();
      const docRef = doc(db, 'events', event.id);
      await setDoc(docRef, event);
      toast.success('Event saved successfully');
      paymentInfoDispatch({ type: 'SET_EVENT', payload: event });
      setEvent(createEventInitialState(paymentInfo.id));
    } catch (error: any) {
      if (error.hasOwnProperty('message')) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteEventFromDB = async (eventID: string) => {
    setLoading(true);
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'events', eventID));
      toast.success('Event deleted successfully');
      paymentInfoDispatch({
        type: 'SET_EVENTS',
        payload: paymentInfo.events.filter((event) => event.id !== eventID),
      });
    } catch (error: any) {
      if (error.hasOwnProperty('message')) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteAllEventsFromDB = async (paymentID: string) => {
    setLoading(true);
    try {
      const db = getFirestore();
      const collectionRef = collection(db, 'events');
      const q1 = where('paymentID', '==', paymentID);
      const queryRef = query(collectionRef, q1);
      const dataSnap = await getDocs(queryRef);
      const data = dataSnap.docs.map((doc) => doc.data());
      if (data.length > 0) {
        data.forEach(async (event) => {
          await deleteDoc(doc(db, 'events', event.id));
        });
        toast.success('All events deleted successfully');
        paymentInfoDispatch({ type: 'SET_EVENTS', payload: [] });
      }
    } catch (error: any) {
      if (error.hasOwnProperty('message')) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePaymentFromDB = async (paymentID: string) => {
    setLoading(true);
    try {
      const db = getFirestore();

      // Delete payment
      await deleteDoc(doc(db, 'payments', paymentID));

      // Delete all events related to the payment
      await deleteAllEventsFromDB(paymentID);

      toast.success('Payment deleted successfully');
      paymentInfoDispatch({ type: 'RESET_PAYMENT' });
    } catch (error: any) {
      if (error.hasOwnProperty('message')) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        paymentInfo,
        paymentInfoDispatch,
        fetchPaymentFromDB,
        savePaymentToDB,
        isPaymentSaveOnDB,
        event,
        setEvent,
        saveEventToDB,
        deleteEventFromDB,
        deletePaymentFromDB,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
