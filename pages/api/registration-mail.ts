import {NextApiRequest, NextApiResponse} from "next";
import {sendRegistrationEmail} from "../../infrastructure/email-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        console.log('registration mail to', req.body.email);
        const email = req.body.email;
        // await sendRegistrationEmail(email);
        return res.status(429).json({message: 'disabled for now'});
    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }
}