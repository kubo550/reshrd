import type {NextApiRequest, NextApiResponse} from 'next'
import {generateCodeId} from "../../../infrastructure/generateCode";
import {createNewCustomer, getCustomerByEmail, updateCustomer} from "../../../infrastructure/firebase";
import {Product, ShopifyItem} from "../../../types/products";
import {sendEmailToOldCustomer, sendInvitationEmail} from "../../../infrastructure/email-utils";


const getImageUrl = (sku: string) => `https://cdn.shopify.com/s/files/1/0671/8187/1393/files/${sku.slice(0, -1)}.jpg`;

const toDbItemsFormat = async (item: ShopifyItem): Promise<Omit<Product, 'orderId'>> => {

    const codeId = await generateCodeId();

    return {
        codeId,
        imageUrl: getImageUrl(item.sku),
        linkUrl: 'https://reshrd.com/',
        name: '',
        title: item.name,
        productId: item.product_id,
        sku: item.sku,
        modifiedCount: 0,
    }
};


async function getMappedItems(items: ShopifyItem[], orderNumber: string) {
    if (!items) {
        return [];
    }
    const mappedItems = [];

    const allItems = items.reduce((acc, item) => {
        const quantity = item.quantity;
        const newItem = {...item, quantity: 1};
        const newItems = Array(quantity).fill(newItem);
        return [...acc, ...newItems];
    }, [] as ShopifyItem[]);

    for (const item of allItems) {
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
        console.log('handle-buy-item - new request');
        const customerEmail = req.body.customer.email

        console.log('handle-buy-item - customerEmail', customerEmail);

        const customerNewProducts = await getMappedItems(req.body.line_items, req.body.order_number);

        const customer = await getCustomerByEmail(customerEmail);
        console.log('handle-buy-item - got customer', customer);

        if (!customer) {
            console.log('customer not found, creating new one');
            await createNewCustomer(customerEmail, customerNewProducts);
            await sendInvitationEmail(customerEmail);
        } else {
            console.log('customer found, updating');
            await updateCustomer(customer as any, [...customer.items, ...customerNewProducts]);
            await sendEmailToOldCustomer(customerEmail);
        }

        res.status(200).json({status: 'ok'});

        return
    } catch (e) {
        console.log('ERROR')
        console.error(e)
        res.status(200).json({status: 'error'});
        return
    }
}

