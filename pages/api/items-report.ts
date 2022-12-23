import {NextApiRequest, NextApiResponse} from "next";
import {getCustomers} from "../../infrastructure/firebase";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const customersData = await getCustomers();
        const mappedCustomers = customersData.map(customer => {
            return {
                email: customer.email,
                items: customer.items
            }
        });

        res.setHeader('Content-disposition', 'attachment; filename=customers.json');
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify(mappedCustomers));
        res.end();

    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

}