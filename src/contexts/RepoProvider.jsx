import React, { useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import { db } from "../fbconfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const RepoContext = React.createContext();

export const useRepo = () => {
    return useContext(RepoContext);
}

const RepoProvider = (props) => {
    const { currentUser } = useAuth();

    const setData = (data) => {
        return setDoc(doc(db, "users", currentUser.uid), data);
    }

    const getUserData = async () => {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // doc.data() will be undefined in this case
            throw new Error("No data found for user ", currentUser.uid);
        }
    }

    useEffect(() => {

    }, [])

    return (
        <RepoContext.Provider value={{ setData, getUserData }}>
            {props.children}
        </RepoContext.Provider>
    );
}

export default RepoProvider;