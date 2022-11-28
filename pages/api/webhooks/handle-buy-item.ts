import type {NextApiRequest, NextApiResponse} from 'next'
import {db} from "../../../config/firebase";
import {addDoc, collection} from "@firebase/firestore";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const customerId = createRandomId();

        const customer = {
            id: customerId,
            email: 'test@test.com',
            createdAt: '2022-11-28T00:00:00.000Z',
            updatedAt: '2022-11-28T00:00:00.000Z',
            items: [
                {
                    id: 'item-1',
                    linkUrl: 'https://www.amazon.com/Apple-MacBook-13-inch-256GB-Storage/dp/B08N5Z3Q7Q/ref=sr_1_1?dchild=1&keywords=macbook+pro&qid=1638080003&sr=8-1',
                }
            ]
        }
        const customerRef = collection(db, 'customers');
        const docRef = await addDoc(customerRef, customer);
        console.log("Document written with ID: ", docRef.id);


        res.status(200).json({success: docRef.id})
    } catch (e) {
        console.error(e)
        res.status(500).json({success: false})
    }
}


function createRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}