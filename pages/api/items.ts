import {NextApiResponse} from "next";
import {getCustomerByEmail} from "../../infrastructure/firebase";
import {use} from 'next-api-route-middleware';
import {NextApiRequestWithUser, validateMethod, validateUser} from "../../utils/validateUser";


export default use(validateMethod('GET'), validateUser, async (
    req: NextApiRequestWithUser,
    res: NextApiResponse,
) => {
    try {
        const email = req.headers.email;
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
});