import {Product} from "../../types/products";
import Image from "next/image";

interface ProductItemProps {
    product: Product;
    onEditName: (name: string) => void;
    onEditLink: (link: string) => void;
}

export const ProductItem = ({product, onEditName, onEditLink}: ProductItemProps) => {
    const {title,name,imageUrl,linkUrl} = product
    return (
        <div>
            <div>
                <Image src={imageUrl
                } alt={title} width={150} height={150}/>

            </div>
            <div>
                <h3>{title}</h3>


                <input type="text" value={name} onChange={(e) => onEditName(e.target.value)} />

                <input type="text" value={linkUrl} onChange={(e) => onEditLink(e.target.value)} />

                <div>

                </div>

            </div>
        </div>
    );
}