import {Middleware} from "next-api-route-middleware";
import {firebaseAdmin} from "../config/firebaseAdmin";
import {NextApiRequest} from "next";

export type NextApiRequestWithUser = NextApiRequest & { headers: { email: string } };

type AllowedMethod = 'GET' | 'POST';


export const isAdmin = (email: string | null | undefined) => {
    console.log('checking if admin', email);
    if (!email) return false;
    const adminEmails = process.env.NEXT_PUBLIC_RESHRD_ADMIN_EMAIL?.split(',') || [];
    console.log('admin emails', adminEmails);

    return adminEmails.includes(email);
}
export const validateMethod = (method: AllowedMethod): Middleware => async (req, res, next) => {
    if (req.method !== method) {
        return res.status(405).json({message: 'Method not allowed'});
    }
    await next();
}

export async function getTokenInfo(token: string) {
    let decodedToken;
    try {
        decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    } catch (e) {
        return null;
    }
    return decodedToken;
}

export const validateUser: Middleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')?.[1] as string;

    if (!token) {
        console.log('validate user - no token');
        res.status(401).json({message: 'Unauthorized'});
        return;
    }

    try {
        const tokenInfo = await getTokenInfo(token);
        if (!tokenInfo || !tokenInfo.email) {
            console.log('validate user - no email found');
            res.status(401).json({message: 'Unauthorized'});
            return;
        }
        console.log('validateUser - email found', tokenInfo.email);
        req.headers.email = tokenInfo.email;

        await next();
    } catch (e) {
        console.log('Error verifying token', e);
        res.status(401).json({message: 'Unauthorized'});
        return;
    }
}