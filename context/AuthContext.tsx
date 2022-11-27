import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    UserCredential
} from "@firebase/auth";
import {auth} from "../config/firebase";


type UserType = {
    uid: string,
    email: string | null,
    displayName: string | null,
} | null;


interface AuthContextData {
    currentUser: UserType;
    login: (email: string, password: string) => Promise<UserCredential>;
    register: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);


interface AuthProviderProps {
    children: ReactNode;
}
export const AuthContextProvider: FC<AuthProviderProps> = ({children}) => {

    const [currentUser, setCurrentUser] = useState<UserType>(null);

    const register = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setCurrentUser(null);
        return auth.signOut();
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(user?.email);
            if (user) {
                setCurrentUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                });
            }else {
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();

    }, []);

    return (
        <AuthContext.Provider value={{currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}
