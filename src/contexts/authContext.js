import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail ,
  updatePassword
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (auth, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (auth, email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = (auth) => {
    return signOut(auth);
  };

  const resetPassword = (auth, email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (currentUser,email) => {
    return updateEmail(currentUser, email);
  };

  const updateUserPassword = (currentUser,password) => {
    return updatePassword(currentUser, password)
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setCurrentUser(user);
      setLoading((prev) => false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logOut,
    resetPassword,
    updateUserPassword,
    updateUserEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
