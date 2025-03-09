import { createContext, useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import app from "../configs/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import UserService from "../services/user.service";

const cookies = new Cookies();
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth(app);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    cookies.remove("token");
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = ({ name, photoURL }) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    return userInfo;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const { email } = currentUser;
          const response = await UserService.signJwt(email);

          if (response.data) {
            cookies.set("user", response.data);
          }
        } catch (error) {
          console.error("Error signing JWT:", error);
        }
      } else {
        cookies.remove("user");
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const authInfo = {
    user,
    getUser,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUserProfile,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;