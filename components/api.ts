import {UserType} from "../context/AuthContext";
import axios from "axios";
import {Product} from "../types/products";

function getHeaders() {
    return {
        'Authorization': `Bearer very-secret-token`,
    };
}

export async function getItems(user: UserType | null): Promise<any> {
    if (!user) {
        return {};
    }
    const {email} = user;
    const {data} = await axios.get(`/api/items?email=${email}`, {headers: getHeaders()});
    return data;
}

export async function saveProducts(userId: string, products: Product[]): Promise<any> {
    const {data} = await axios.post(`/api/save-items?user=${userId}`, {products}, {headers: getHeaders()});
    return data;
}

export async function sendContactForm(emailData: {message: string, email: string, subject: string}): Promise<any> {
    const {data} = await axios.post(`/api/contact`, emailData, {headers: getHeaders()});
    return data;
}