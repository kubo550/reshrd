import axios from "axios";

export class ApiClient {
    constructor(private readonly token: string) {
    }

    async getItems() {
        const {data} = await axios.get(`/api/items`, {
            headers: this.getAuthorization()
        });
        return data
    }

    async saveItem() {
        const {data} = await axios.post(`/api/save-items`, {
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
        return {
            'Authorization': `Bearer ${this.token}`
        }
    }
}


// export async function saveProducts(userId: string, products: Product[]): Promise<any> {
//     const {data} = await axios.post(`/api/save-items?user=${userId}`, {products}, {
//         headers: getHeaders()
//     });
//     return data;
// }

// export async function sendContactForm(emailData: { message: string, email: string, subject: string }): Promise<any> {
//     const {data} = await axios.post(`/api/contact`, emailData, {
//         headers: getHeaders()
//     });
//     return data;
// }

// export async function getReport(): Promise<any> {
//     const {data} = await axios.get<any>('/api/items-report', {
//         responseType: 'blob',
//         headers: getHeaders()
//     });
//     return data;
// }