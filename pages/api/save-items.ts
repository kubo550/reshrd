import { NextApiResponse} from "next";
import {saveItems} from "../../infrastructure/firebase";
import {use} from "next-api-route-middleware";
import {NextApiRequestWithUser, validateMethod, validateUser} from "../../utils/validateUser";



export default use(validateMethod('POST'), validateUser, async (
    req: NextApiRequestWithUser,
    res: NextApiResponse
) => {

    try {
        const email = req.headers.email;
        const newItems = req.body.products;

        await saveItems(email, newItems)

        res.status(200).json({items: newItems});
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

});