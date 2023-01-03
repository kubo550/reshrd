import {useCallback, useState} from "react";
import styles from '../styles/Home.module.css'
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
} from '@chakra-ui/react';
import {ApiClient} from "../components/api";
import Head from "next/head";
import {GetServerSideProps} from "next";
import nookies from "nookies";
import {getTokenInfo, isAdmin} from "../utils/validateUser";

function download(data: any, filename: string, type: string) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.setAttribute('download', `${filename}.${type}`);
    link.setAttribute('href', url);
    document.body.appendChild(link);
    link.click();
}

export default function Admin() {
    const [isReportLoading, setIsReportLoading] = useState(false);

    const handleDownloadReport = useCallback(async () => {
        setIsReportLoading(true);

        const apiClient = new ApiClient();
        const reportData = await apiClient.getReport();

        download(reportData, 'report', 'csv');
        setIsReportLoading(false);
    }, []);


    return (
        <div className={styles.container}>

            <Head>
                <title>Admin - Updateable QR Clothing Control Panel | RESHRD</title>
            </Head>

            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{base: 8, md: 14}}
                    py={{base: 20, md: 36}}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
                        lineHeight={'110%'}>
                        Admin <br/>
                        <Text as={'span'} color={'green.400'}>
                            Panel
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        Monetize your content by charging your most loyal readers and reward
                        them loyalty points. Give back to your loyal readers by granting
                        them access to your pre-releases and sneak-peaks.
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                        <Button
                            onClick={handleDownloadReport}
                            colorScheme={'green'}
                            bg={'green.400'}
                            rounded={'full'}
                            isLoading={isReportLoading}
                            px={6}
                            _hover={{
                                bg: 'green.500',
                            }}>
                            Download Report
                        </Button>

                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)

    console.log('HELLLLLLOooooooooooo')
    const token = cookies.token;

    const decodedToken = await getTokenInfo(token);

    if (!isAdmin(decodedToken?.email)) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
            props: {

            }
        }
    }

    return {
        props: {
            server: true,
        },
    }
}
