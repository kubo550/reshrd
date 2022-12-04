import {Product} from "../../types/products";
import _ from "lodash";
import {ProductItem} from "./ProductItem";
import {useCallback, useState} from "react";
import {saveProducts} from "../api";
import {useAuth} from "../../context/AuthContext";


interface ProductListProps {
    products: Product[];
    customerId: string;
}

export const ProductList = ({products, customerId}: ProductListProps) => {
    const [actualDbState, setActualDbState] = useState(products);
    const [localState, setLocalState] = useState(products);
    const [userId] = useState(customerId);


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
        try {
            const response = await saveProducts(userId, localState);
            setActualDbState(localState);
        } catch (e) {
            console.log(e);

        }
    }

    return (
        <div>
            {
                hasUnsavedChanges() && <button onClick={handleSave}>save changes</button>
            }

            {localState.map((product, i) => (

                <ProductItem product={product} onEditName={handleEditName(product.codeId)}
                             onEditLink={handleEditLink(product.codeId)} key={i}/>

            ))}
        </div>
    );
};
