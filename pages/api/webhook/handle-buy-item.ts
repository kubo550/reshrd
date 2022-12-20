import type {NextApiRequest, NextApiResponse} from 'next'
import {createNewCustomer, getCustomerByEmail, updateCustomer} from "../items";
import {generateCodeId} from "../../../infrastructure/generateCode";


const toDbItemsFormat = async (item: any) => {

    const codeId = await generateCodeId();

    return {
        codeId,
        title: item.name,
        productId: item.product_id,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0671/8187/1393/products/1-1.jpg?v=1669923158',
        linkUrl: '',
        name: '',
    }
};


async function getMappedItems(items: any[]) {
    let mappedItems = [];
    for (const item of items) {
        const mappedItem = await toDbItemsFormat(item);
        mappedItems.push(mappedItem);
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

        const customerNewProducts = await getMappedItems(req.body.line_items);

        const customer = await getCustomerByEmail(customerEmail);

        if (!customer) {
            await createNewCustomer(customerEmail, customerNewProducts);
            // await sendInvitationEmail(customerEmail);
        } else {
            await updateCustomer(customer as any, [...customer.items, ...customerNewProducts]);
            // TODO await sendInvitationEmail(customerEmail);
        }


        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
        res.status(500).json({success: false})
    }
}
