import { useEffect, useState } from "react";
import { UserContext } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const authState = onAuthStateChanged(auth, (u) => {
            if (u) setUser(u)
            else setUser(null)
            setLoading(false);
        })
        return authState;
    }, [])

    return (
        <UserContext.Provider value={{ user, loading, auth }}>
            {children}
        </UserContext.Provider>
    )
}