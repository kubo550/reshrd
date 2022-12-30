import type {NextApiRequest, NextApiResponse} from 'next'
import {generateCodeId} from "../../../infrastructure/generateCode";
import {createNewCustomer, getCustomerByEmail, updateCustomer} from "../../../infrastructure/firebase";
import {ShopifyItem} from "../../../types/products";


const getImageUrl = (sku: string) => `https://cdn.shopify.com/s/files/1/0671/8187/1393/files/${sku.slice(0, -1)}.jpg`;

const toDbItemsFormat = async (item: ShopifyItem) => {

    const codeId = await generateCodeId();

    return {
        codeId,
        title: item.name,
        productId: item.product_id,
        imageUrl: getImageUrl(item.sku),
        linkUrl: 'https://reshrd.com/',
        name: '',
        sku: item.sku
    }
};


async function getMappedItems(items: ShopifyItem[], orderNumber: string) {
    if (!items) {
        return [];
    }
    const mappedItems = [];
    for (const item of items) {
        const mappedItem = await toDbItemsFormat(item);
        mappedItems.push({...mappedItem, orderId: orderNumber});
    }
    return mappedItems;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const customerEmail = 'test@wp.pl';
        // const customerEmail = req.body.customer.email

        const customerNewProducts = await getMappedItems(req.body.line_items, req.body.order_number);

        // console.log('customerNewProducts', customerNewProducts);
        const customer = await getCustomerByEmail(customerEmail);

        if (!customer) {
            console.log('customer not found, creating new one');
            await createNewCustomer(customerEmail, customerNewProducts);
            // await sendInvitationEmail(customerEmail);
        } else {
            console.log('customer found, updating');
            await updateCustomer(customer as any, [...customer.items, ...customerNewProducts]);
            // await sendEmailToOldCustomer(customerEmail);
        }


        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
        res.status(500).json({success: false})
    }
}

