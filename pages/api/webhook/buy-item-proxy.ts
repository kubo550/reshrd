import {NextApiRequest, NextApiResponse} from "next";
import {ApiClient} from "../../../components/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('buy-item-proxy');

    ApiClient.triggerWebhook(req.body);


    return res.status(200).json({message: 'ok'});
}