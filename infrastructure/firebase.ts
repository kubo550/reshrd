import {db} from "../config/firebase";
import {addDoc, collection, doc, getDocs, updateDoc} from "@firebase/firestore";

type DbItem = {
    codeId: string,
    productId: string,
    imageUrl: string,
    linkUrl: string,
    name: string,
    title: string,
    sku: string
};

type DbCustomer = {
    email: string,
    createdAt: string,
    items: DbItem[]
}


export async function getCustomers() {
    console.log('getCustomers');
    const customerRef = collection(db, 'customers');

    const documents = await getDocs(customerRef);
    return documents.docs.map(doc => doc.data());
}


export async function updateItem(email: string, codeId: string, newName: string, newLinkUrl: string) {
    console.log('updateItem', {email, codeId, newName, newLinkUrl});

    const customerRef = collection(db, 'customers');
    const customers = await getDocs(customerRef);

    const customer = customers.docs.find(doc => doc.data().email === email);

    if (!customer) {
        console.log('updateItem: customer not found');
        return
    }

    const customerDoc = doc(db, 'customers', customer.id);
    const customerData = customer.data();
    const items = customerData.items;
    const item = items.find((item: any) => item.codeId === codeId);

    if (!item) {
        console.log('updateItem: item not found');
        return
    }

    if (item.linkUrl !== newLinkUrl) {
        item.modifiedCount = parseInt( item.modifiedCount || 0,10)  + 1;
    }

    item.name = newName;
    item.linkUrl = newLinkUrl;


    await updateDoc(customerDoc, {
        items
    });
}


export async function getCustomerByEmail(email: string | null) {
    console.log('getCustomerByEmail', {email});
    if (!email) {
        console.log('getCustomerByEmail - no email');
        return {};
    }
    const customers = await getCustomers();
    return customers.find(customer => customer.email === email);
}


export async function createNewCustomer(customerEmail: string, customerNewProducts: DbItem[]) {
    console.log('createNewCustomer', {customerEmail, customerNewProducts});
    const customerRef = collection(db, 'customers');

    const newCustomer: DbCustomer = {
        email: customerEmail,
        createdAt: new Date().toISOString(),
        items: customerNewProducts
    }

    const docRef = await addDoc(customerRef, newCustomer);
    console.log("Document written with ID: ", docRef.id);
}


export async function updateCustomer(customer: DbCustomer, customerAllProducts: DbItem[]) {
    console.log('updateCustomer', {customer, customerAllProducts});
    const customerRef = collection(db, 'customers');
    const customers = await getDocs(customerRef);

    const customerDoc = customers.docs.find(doc => doc.data().email === customer.email);

    if (!customerDoc) {
        console.log('updateCustomer - customer not found');
        return
    }

    const customerDocRef = doc(db, 'customers', customerDoc.id);

    await updateDoc(customerDocRef, {
        items: customerAllProducts
    });
}
