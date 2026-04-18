import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{children: any}> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        setUser(u);
      }, (error) => {
        console.error("Firebase no responde:", error.message);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Fallo total al conectar con Firebase");
    }
  }, []);

  const login = (e: string, p: string) => signInWithEmailAndPassword(auth, e, p);
  const register = (e: string, p: string) => createUserWithEmailAndPassword(auth, e, p);
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);