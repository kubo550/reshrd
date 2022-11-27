import React, {FC} from 'react'
import Link from 'next/link'
import Image from "next/image";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/navigation";


interface HeaderProps {

}

export const Header: FC<HeaderProps> = () => {
    const {currentUser, logout} = useAuth();

    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    }

    return (

        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            height: '60px',
            borderBottom: '1px solid #eee'
        }}>

            <a href="https://reshrd.com/" target="_blank" rel="noreferrer"
               style={{
                   marginLeft: '20px',
               }}
            >
                <Image src={'/logo_white_200x.png'} alt="logo" width={150} height={21}/>
            </a>

            <nav>
                <ul style={{
                    display: 'flex',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0
                }}>
                    <li
                        style={{
                            marginRight: '0.5rem',
                            marginLeft: '0.5rem'
                        }}
                    >
                        <Link href="/">Home</Link>
                    </li>

                    <li
                        style={{
                            marginRight: '0.5rem',
                            marginLeft: '0.5rem'
                        }}>
                        <Link href={
                            currentUser ? '/items' : '/login'
                        }>Manage your items</Link>
                    </li>

                    <li
                        style={{
                            marginRight: '0.5rem',
                            marginLeft: '0.5rem'
                        }}>
                        <Link href="/about">How does it work</Link>
                    </li>

                    <li
                        style={{
                            marginRight: '0.5rem',
                            marginLeft: '0.5rem'
                        }}>
                        <Link href="/contact">Contact us</Link>
                    </li>
                </ul>
            </nav>

            <span>

                {currentUser ? (
                    <>
                        <span style={{marginRight: '0.5rem'}}>{currentUser.email}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link href='/login'>Login</Link>

                        <Link style={{
                            marginLeft: '0.5rem'
                        }} href={'/register'}>Register</Link>
                    </>

                )}
            </span>
        </div>
    );
};
