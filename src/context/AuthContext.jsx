import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.config";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const register = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const googleLogin = () => signInWithPopup(auth, googleProvider);

    const logout = () => signOut(auth);

    const updateUserProfile = (name, photo) =>
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo });

    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        register,
        login,
        googleLogin,
        logout,
        updateUserProfile,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;