import {NextApiRequest, NextApiResponse} from "next";
import {getCustomerByEmail, saveItems} from "./items";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(404).json({message: 'Not found'});
        return;
    }

    if (!req.headers.authorization) {
        res.status(401).json({});
        return;
    }

    try {
        const userId = req.query.user as string;
        const newItems = req.body.products;

        await saveItems(userId, newItems)

        res.status(200).json({items: newItems});

    }
    catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

}