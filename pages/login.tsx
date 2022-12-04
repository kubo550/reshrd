import Head from "next/head";
import styles from '../styles/Home.module.css'
import {useState} from "react";
import Link from "next/link";
import {useAuth} from "../context/AuthContext";
import {useRouter} from "next/navigation";
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const {login} = useAuth();
    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            await login(email, password);
            router.push('/');
        } catch (e) {
            console.log(e);
            setError('Failed to login, please try again or contact support');
        }


    };

    return (
        <ProtectedRoute type={'onlyGuest'}>
            <div className={styles.container}>
                <Head>
                    <title>Qr id | Login</title>
                    <meta name="description" content="Generated by create next app"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <main className={styles.main}>

                    <div>

                        <h3>Login</h3>

                        <form>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>

                                <br/>

                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password"
                                       onChange={(e) => setPassword(e.target.value)}/>

                            </div>

                            <button type="submit" onClick={handleLogin}>Login</button>

                        </form>


                        <p>Don&lsquo;t have an account?
                            <Link href="/register"> register
                            </Link>

                        </p>

                        <p>Forgot password?
                            <Link href="/forgot-password"> reset password
                            </Link>
                        </p>


                    </div>

                </main>

            </div>
        </ProtectedRoute>
    );
}