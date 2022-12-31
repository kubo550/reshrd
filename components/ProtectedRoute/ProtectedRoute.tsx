import {FC, ReactNode, useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/navigation";


interface ProtectedRouteProps {
    children: ReactNode;
    token?: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children, token}) => {

    const {currentUser} = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (token) {
            return
        }
        if (!currentUser) {
            router.push('/login');
        }

    }, [currentUser, router]);

    return (
        <>
            {
               currentUser ? children : null
            }
        </>
    );
}