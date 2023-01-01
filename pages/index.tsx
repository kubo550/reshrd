
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";
import {useQuery} from "react-query";
import {useAuth} from "../context/AuthContext";
import {ApiClient} from "../components/api";
import {ProductList} from "../components/ProductsList/ProductList";
import {Container, Spinner, Text} from "@chakra-ui/react";
import Head from "next/head";
import {GetServerSideProps} from "next";
import nookies from "nookies";


export default function Index(props: any) {
    const {getCurrentUserToken} = useAuth();


    async function getItemsQuery() {
        const token = await getCurrentUserToken() || '';
        const apiClient = new ApiClient(token);
        return await apiClient.getItems();
    }

    const {data, isLoading, isError} = useQuery('items',  getItemsQuery, {
        enabled: !!getCurrentUserToken,
        refetchOnWindowFocus: false,
    });

    return (
        <ProtectedRoute token={props?.cookies.token}>
            <Head>
                <title>Your items - Updateable QR Clothing Control Panel | RESHRD</title>
            </Head>
            <div>
                <Container minH={'88vh'} maxW={'7xl'} p="12">

                    {isLoading && <Spinner size={'xl'}/>}

                    {isError && <p>Error</p>}

                    {data && <ProductList products={data.items} />}

                    {
                        data && data.items.length === 0 && <Text>You don&lsquo;t have any items yet</Text>
                    }

                </Container>
            </div>
        </ProtectedRoute>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx)

    return {
        props: {
            server: true,
            cookies,
        },
    }
}