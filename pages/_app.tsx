import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Footer} from "../components/Footer/Footer";
import {Header} from "../components/Header/Header";
import {AuthContextProvider} from "../context/AuthContext";
import {QueryClient, QueryClientProvider} from "react-query";
import {useState} from "react";
import {ChakraProvider, Flex} from "@chakra-ui/react";
import {extendTheme} from '@chakra-ui/react'

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    colors: {
        brand: {
            100: '#00264c',
            200: '#57b0e3',
            300: '#ffffff',
            400: '#000000',
            500: '#98d7fc',
            600: '#f9fbff',
        },
    },
}

const theme = extendTheme({config})

export default function App({Component, pageProps}: AppProps) {
    const [queryClient] = useState(() => new QueryClient())

    return <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
            <ChakraProvider theme={theme} cssVarsRoot="body">
                <Flex
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    flex={'1'}
                    minH={'100vh'}
                    margin={0}
                >
                    <Header/>
                    <Component {...pageProps} />
                    <Footer/>
                </Flex>
            </ChakraProvider>
        </AuthContextProvider>
    </QueryClientProvider>
}
