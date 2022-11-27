import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;


    if (method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const result = await new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Janusz Doe' });
        }, 3000);
    });

    res.status(200).json({ result })
}
