import {NextApiRequest, NextApiResponse} from "next";
import {getCustomerByEmail} from "../../infrastructure/firebase";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(404).json({message: 'Not found'});
        return;
    }

    if (!req.headers.authorization) {
        res.status(401).json({});
        return;
    }

    try {
        const email = req.query.email as string;
        const customer = await getCustomerByEmail(email);

        if (!customer) {
            // res.status(404).json({message: 'Customer not found'});
            res.status(200).json({items: [], customerId: null});

            return;

        }


        const items = customer.items;


        res.status(200).json({items, customerId: customer.id});

    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

}