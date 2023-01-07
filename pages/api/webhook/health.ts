import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('health check');
    return res.status(200).json({message: 'ok'});
}