import {FC, ReactNode, useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/navigation";


interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {

    const {currentUser} = useAuth();

    const router = useRouter();

    useEffect(() => {
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