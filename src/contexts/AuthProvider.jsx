import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import React, { useEffect, useState, useContext } from "react";
import { auth, functions } from "../fbconfig";

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

    const makeAdmin = (email) => {
        const addAdminRole = httpsCallable(functions, "addAdminRole");
        addAdminRole({ email: email }).then(result => console.log(result));
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult().then(idTokenResult => {
                    user.admin = idTokenResult.claims.admin;
                });
                setCurrentUser(user);

            }
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser, signUp, login, logout, resetPassword, makeAdmin }}>
            {!loading && props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;