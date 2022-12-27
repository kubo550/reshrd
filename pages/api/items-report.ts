import {NextApiRequest, NextApiResponse} from "next";
import {getCustomers} from "../../infrastructure/firebase";
import {use} from "next-api-route-middleware";
import {validateMethod, validateUser} from "../../utils/validateUser";

export default use(validateMethod('GET'), validateUser, async(
    req: NextApiRequest,
    res: NextApiResponse
) => {

    try {
        const customersData = await getCustomers();
        const urlPerCodeId = customersData.reduce((acc, customer) => {
            customer.items.forEach((item: any) => {
                acc[item.codeId] = item.linkUrl;
            });
            return acc;
        }, {});


        res.setHeader('Content-disposition', 'attachment; filename=customers.json');
        res.setHeader('Content-type', 'application/json');
        res.write(JSON.stringify(urlPerCodeId));
        res.end();

    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

});