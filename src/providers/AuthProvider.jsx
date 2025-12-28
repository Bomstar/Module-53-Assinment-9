import { createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
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

  // google and GitHub Authentication
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  console.log("GitHub Provider:", googleProvider);

  const googleAuthentication = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const githubAuthentication = () => {
    return signInWithPopup(auth, githubProvider);
  };

  //   Update User Profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // user Objerber
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserData(user);
      console.log("Auth State Changed:", user);
    });
  }, []);

  const value = {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    userData,
    googleAuthentication,
    githubAuthentication,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
