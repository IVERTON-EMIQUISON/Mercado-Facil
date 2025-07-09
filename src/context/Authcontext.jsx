// src/context/Authcontext.jsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, signOut, onAuthStateChanged } from 'firebase/auth';

// 🔧 Defina o config corretamente
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [firebaseAuth, setFirebaseAuth] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      setFirebaseAuth(auth);

      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setUserId(currentUser.uid);
        } else {
          try {
            await signInAnonymously(auth);
          } catch (error) {
            console.error("Erro ao fazer login anônimo:", error);
          }
        }
        setAuthReady(true);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Erro ao inicializar Firebase:", error);
      setAuthReady(true);
    }
  }, []);

  const login = async () => {
    if (firebaseAuth) {
      try {
        await signInAnonymously(firebaseAuth);
      } catch (error) {
        console.error("Erro ao fazer login anônimo:", error);
      }
    }
  };

  const logout = async () => {
    if (firebaseAuth) {
      try {
        await signOut(firebaseAuth);
        setUser(null);
        setUserId(null);
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, userId, authReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
