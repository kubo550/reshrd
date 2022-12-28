import {FC, ReactNode, useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/navigation";


interface ProtectedRouteProps {
    children: ReactNode;
    type: 'onlyGuest' | 'onlyAuth';
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({children, type}) => {

    const {currentUser} = useAuth();

    const router = useRouter();

    useEffect(() => {
        if (type === 'onlyAuth' && !currentUser) {
            router.push('/login');
        }
        if (type === 'onlyGuest' && currentUser) {
            router.push('/');
        }
    }, [currentUser, type, router]);

    return (
        <>
            {
               currentUser ? children : null
            }
        </>
    );
}