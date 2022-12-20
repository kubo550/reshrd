import type {NextApiRequest, NextApiResponse} from 'next'
import {createNewCustomer, getCustomerByEmail, updateCustomer} from "../items";
import {sendInvitationEmail} from "../../../infrastructure/email-utils";


const toDbItemsFormat = (item: any) => {
    const codeId = createRandomId();

    return {
        codeId,
        title: item.name,
        productId: item.product_id,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0671/8187/1393/products/1-1.jpg?v=1669923158',
        linkUrl: '',
        name: '',
    }
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const customerEmail = 'test@wp.pl';
        // const customerEmail = req.body.customer.email

        const customerNewProducts = req.body.line_items.map(toDbItemsFormat);

        const customer = await getCustomerByEmail(customerEmail);

        if (!customer) {
            await createNewCustomer(customerEmail, customerNewProducts);
            // await sendInvitationEmail(customerEmail);
        } else {
            await updateCustomer(customer as any, [...customer.items, ...customerNewProducts]);
            await sendInvitationEmail(customerEmail);
        }


        res.status(200).json({success: true})
    } catch (e) {
        console.error(e)
        res.status(500).json({success: false})
    }
}


function createRandomId() {
    return Math.floor(10000 + Math.random() * 900000).toString();

}