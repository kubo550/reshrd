import {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../../config/firebase";
import {addDoc, collection, getDocs} from "@firebase/firestore";


async function getCustomersData() {
    const customerRef = collection(db, 'customers');

    const documents = await getDocs(customerRef);
    const customers = documents.docs.map(doc => doc.data());
    return customers;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    try {
        const customers = await getCustomersData();



        res.status(200).json({success: customers})

    } catch (e) {
        console.error(e)
        return res.status(500).json({success: false})
    }

}