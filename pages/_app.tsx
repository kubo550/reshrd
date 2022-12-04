import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Footer} from "../components/Footer/Footer";
import {Header} from "../components/Header/Header";
import {AuthContextProvider} from "../context/AuthContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ChakraProvider} from "@chakra-ui/react";

export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <ChakraProvider>
                <Header/>
                <Component {...pageProps} />
                <Footer/>
            </ChakraProvider>
        </AuthContextProvider>
    </QueryClientProvider>
}
