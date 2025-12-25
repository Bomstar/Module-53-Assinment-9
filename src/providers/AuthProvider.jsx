import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import auth from "../firebeas/firebase.config";
import { useEffect, useState } from "react";

const AuthContext = createContext();
export const authUser = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [userData, setUserData] = useState(null);


  // Register User
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout User
  const logoutUser = () => {
    return signOut(auth);
  };

 //   Update User Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {displayName: name, photoURL: photoURL});
  };

  // user Objerber
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserData(user);
    });
  }, []);

  const value = {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    userData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
