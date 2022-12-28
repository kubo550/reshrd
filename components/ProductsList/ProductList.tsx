import {Product} from "../../types/products";


import {
    Heading,
} from '@chakra-ui/react';
import {ProductItem} from "./ProductItem";

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({products}: ProductListProps) => {


    return (
        <>
            <Heading as="h1">
                Your Awesome RE:SHRD Items
            </Heading>

            {
                products.map(product => (
                    <ProductItem product={product} key={product.codeId} />
                ))
            }

        </>
    )
}


