import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Footer} from "../components/Footer/Footer";
import {Header} from "../components/Header/Header";
import {AuthContextProvider} from "../context/AuthContext";

export default function App({Component, pageProps}: AppProps) {
    return <AuthContextProvider>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </AuthContextProvider>
}
