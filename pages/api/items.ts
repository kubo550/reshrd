import {NextApiRequest, NextApiResponse} from "next";
import {db} from "../../config/firebase";
import { collection, getDocs, doc, updateDoc} from "@firebase/firestore";

export async function getCustomers() {
    const customerRef = collection(db, 'customers');

    const documents = await getDocs(customerRef);
    const customers = documents.docs.map(doc => doc.data());
    return customers;
}

export async function saveItems(userId: string, newItems: any) {
    const customerRef = collection(db, 'customers');
    const customers = await getDocs(customerRef);

    const customer = customers.docs.find(doc => doc.data().id === userId);

    if (!customer) {
        return
    }

    const customerDoc = doc(db, 'customers', customer.id);
    await updateDoc(customerDoc, {
        items: newItems
    });
}

export async function getCustomerByEmail(email: string | null) {
    if (!email) {
        return {};
    }
    const customers = await getCustomers();
    return customers.find(customer => customer.email === email);
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(404).json({message: 'Not found'});
        return;
    }

    if (!req.headers.authorization) {
        res.status(401).json({});
        return;
    }

    try {
        const email = req.query.email as string;
        const customer = await getCustomerByEmail(email);
        if (!customer) {
            res.status(404).json({message: 'Customer not found'});
            return;
        }

        const items = customer.items;


        res.status(200).json({items, customerId: customer.id});

    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

}