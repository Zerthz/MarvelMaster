import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useEffect, useState, useContext } from "react";
import { auth } from "../fbconfig";

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        localStorage.removeItem(currentUser.uid);
        return signOut(auth);
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, signUp, login, logout, resetPassword }}>
            {!loading && props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;