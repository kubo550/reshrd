import axios from "axios";

export class ShopifyClient {



    constructor(private baseUrl: string, private authenticationToken: string) {

    }

    async getProducts() {
        const headers = {
            'X-Shopify-Access-Token': this.authenticationToken
        };
        return axios.get(this.baseUrl + '/admin/api/2021-01/products.json', {headers});
    }


    async getProductImages(productId: string) {
        const headers = {
            'X-Shopify-Access-Token': this.authenticationToken
        };
        return axios.get(this.baseUrl + `/admin/api/2021-01/products/${productId}/images.json`, {headers});
    }

}