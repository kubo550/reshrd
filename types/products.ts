export type Product = {
    "variantId": string,
    "codeId": string,
    "linkUrl": string,
    "productId": string,
    "name": string,
    "title": string,
    "imageUrl": string
}

export type ShopifyItem = {
    id: number,
    variant_id: number,
    title: string,
    quantity: number,
    sku: string,
    variant_title: string,
    vendor: string,
    fulfillment_service: string,
    product_id: string,
    requires_shipping: boolean,
    taxable: boolean,
    gift_card: boolean,
    name: string,
    variant_inventory_management: string,
    properties: any[],
    product_exists: boolean,
    fulfillable_quantity: number,
    grams: number,
    price: string,
    total_discount: string,
    fulfillment_status: string,
    price_set: {
        shop_money: {
            amount: string,
            currency_code: string
        }
    },
    total_discount_set: {
        shop_money: {
            amount: string,
            currency_code: string
        }
    },
    discount_allocations: any[],
    duties: any[],
    admin_graphql_api_id: string,
    tax_lines: any[]
}