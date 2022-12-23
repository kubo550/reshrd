import type { NextApiRequest, NextApiResponse } from 'next'
import {getRedirectUrlByCodeId} from "../../infrastructure/firebase";
import _ from "lodash";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(405).json({message: 'Method not allowed'});
    }

    const codeId = req.query.codeId as string;
    console.log('get-redirect', {codeId});

    if (!codeId) {
        res.status(400).json({message: 'Missing codeId'});
    }

    const redirectUrl = await getRedirectUrlByCodeId(codeId);

    if (_.isNull(redirectUrl)) {
       return res.status(404).json({message: 'Not found'});
    }

    if (redirectUrl === '') {
         return res.status(200).json({message: 'No redirect url'});
    }


    res.status(200).json({ url: redirectUrl });
}