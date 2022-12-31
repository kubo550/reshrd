import axios from "axios";
import {Product} from "../types/products";
import nookies from "nookies";

export class ApiClient {
    constructor(private readonly token: string) {
    }

    async getItems() {
        const {data} = await axios.get(`/api/items`, {
            headers: this.getAuthorization()
        });
        return data
    }

    async updateItem(item: Pick<Product, 'name' | 'codeId' | 'linkUrl'>) {
        const {data} = await axios.post(`/api/update-item`, {item}, {
            headers: this.getAuthorization()
        });
        return data
    }

    async sendContactForm(emailData: { message: string, email: string, subject: string }) {
        const {data} = await axios.post(`/api/contact`, emailData, {
            headers: this.getAuthorization()
        });
        return data
    }

    async getReport() {
        const {data} = await axios.get<any>('/api/items-report', {
            responseType: 'blob',
            headers: this.getAuthorization()
        });
        return data;
    }

    getAuthorization() {
        const cookies = nookies.get(null, 'token');
        return {
            'Authorization': `Bearer ${cookies.token}`
        }
    }
}

