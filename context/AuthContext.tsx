import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import admin from '@/lib/firebase/admin';
import { doc, getDoc } from 'firebase/firestore';

type User = {
  email: string | null;
  uid: string;
};

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().isAdmin) {
          setUser({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading } as any}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | null => useContext(AuthContext);
