import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { db } from '../../firebase.config';

import Spinner from '../../components/layout/Spinner';
import { User } from '../../types';

const initializeUser: User = {
  accountType: '',
  email: '',
  firstname: '',
  lastname: '',
  profileImage: '',
  timestamp: {
    seconds: 0,
    nanoseconds: 0,
  },
  userRef: '',
};

const FirebaseContext = createContext({
  user: initializeUser,
  loading: false,
  loggedIn: false,
  isAdmin: false,
  isSuperAdmin: false,
  setLoading: (loading: boolean) => {},
  setLoggedIn: (loggedIn: boolean) => {},
  setUpdateProfileRequest: (updateProfileRequest: boolean) => {},
});

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initializeUser);
  const [isAdmin, setIsAdmin] = useState(user?.accountType === 'admin' ? true : false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [updateProfileRequest, setUpdateProfileRequest] = useState(false);

  const isMounted = useRef(true);

  // Check if user is logged in
  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(collection(db, 'users'), where('userRef', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userData = querySnapshot.docs[0].data();

          setUser({
            ...userData,
            uid: user?.uid ? user.uid : '',
          } as User);

          setLoggedIn(true);
        } else {
          setUser(initializeUser);
          setLoggedIn(false);
        }
        setLoading(false);
      });
    }

    setUpdateProfileRequest(false);

    return () => {
      isMounted.current = false;
    };
  }, [isMounted, updateProfileRequest]);

  // Update if user is admin
  useEffect(() => {
    setIsAdmin(user?.accountType === 'admin' ? true : false);
    setIsSuperAdmin(user?.uid === import.meta.env.VITE_APP_SUPER_ADMIN ? true : false);
  }, [user]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        loggedIn,
        isAdmin,
        isSuperAdmin,
        setLoading,
        setLoggedIn,
        setUpdateProfileRequest,
      }}
    >
      {children}
      {loading && <Spinner />}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
