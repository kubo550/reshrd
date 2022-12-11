import {Product} from "../../types/products";
import _ from "lodash";
import { useCallback, useState} from "react";
import {saveProducts} from "../api";

import {
    Heading,
    Button, Spinner,
} from '@chakra-ui/react';
import {ProductItem} from "./ProductItem";

interface ProductListProps {
    products: Product[];
    customerId: string;
}

export const ProductList = ({products, customerId}: ProductListProps) => {
    const [actualDbState, setActualDbState] = useState(products);
    const [localState, setLocalState] = useState(products);
    const [userId] = useState(customerId);
    const [loading, setLoading] = useState(false);


    const handleEditLink = (codeId: string) => (link: string) => {
        const product = localState.find(product => product.codeId === codeId);

        if (product) {
            const editedProduct = {...product, linkUrl: link};
            const newLocalState = localState.map(product => product.codeId === codeId ? editedProduct : product);
            setLocalState(newLocalState);
        }
    }

    const handleEditName = (codeId: string) => (name: string) => {
        const product = localState.find(product => product.codeId === codeId);

        if (product) {
            const editedProduct = {...product, name};
            const newLocalState = localState.map(product => product.codeId === codeId ? editedProduct : product);
            setLocalState(newLocalState);
        }
    }

    const hasUnsavedChanges = useCallback(() => {
            return !_.isEqual(actualDbState, localState);
        },
        [actualDbState, localState],
    );


    const handleSave = async () => {
        setLoading(true)
        try {
            await saveProducts(userId, localState);
            setActualDbState(localState);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Heading as="h1">
                Your Awesome RE:SHRD Items
                {
                    hasUnsavedChanges() && <Button
                        px={4}
                        marginLeft={'1%'}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'green.400'}
                        color={'white'}
                        minWidth={'127px'}
                        _hover={{
                            bg: 'green.500',
                        }}
                        _focus={{
                            bg: 'green.500',
                        }}
                        onClick={handleSave}>
                        {loading ? <Spinner /> : 'Save Changes'}
                    </Button>
                }
            </Heading>
            {
                localState.map(product => (
                    <ProductItem product={product}
                                 onEditName={handleEditName(product.codeId)}
                                 onEditLink={handleEditLink(product.codeId)}
                                 key={product.codeId}
                    />
                ))
            }

        </>
    )
}


