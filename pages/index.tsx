
import {ProtectedRoute} from "../components/ProtectedRoute/ProtectedRoute";
import {useQuery} from "react-query";
import {useAuth} from "../context/AuthContext";
import {ApiClient} from "../components/api";
import {ProductList} from "../components/ProductsList/ProductList";
import {Container, Spinner, Text} from "@chakra-ui/react";
import Head from "next/head";


export default function Index() {
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
        <ProtectedRoute>
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