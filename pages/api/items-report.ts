import {NextApiRequest, NextApiResponse} from "next";
import {getCustomers} from "../../infrastructure/firebase";
import {use} from "next-api-route-middleware";
import {validateMethod, validateUser} from "../../utils/validateUser";
import {Product} from "../../types/products";
import {firestore} from "firebase-admin";
import DocumentData = firestore.DocumentData;

type ReportData = {
    'Shopify Order ID': string,
    'Item Name': string,
    'Item SKU': string,
    'QR Code': string,
    'Modified Count': number
    'Link URL': string,
}

function toCSV(data: ReportData[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [header, ...rows].join('\n');
}

function extractReportData(customersData: DocumentData[]) {
    const data = [] as ReportData[];

    console.log('Generating report - Processing customers data...');

    customersData.forEach(customer => {
        customer.items.forEach((item: Product) => {
            data.push({
                'Shopify Order ID': item?.orderId || '',
                'Item Name': item?.title || '',
                'Item SKU': item?.sku || '',
                'QR Code': item?.codeId || '',
                'Link URL': item?.linkUrl || '',
                'Modified Count': item?.modifiedCount || 0,
            })
        })
    });
    return data;
}


export default use(validateMethod('GET'), validateUser,  async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    console.log('Generating report...');

    try {
        const customersData = await getCustomers();
        const data = extractReportData(customersData);

        console.log('Generating report - Processing customers data... Done');

        res.setHeader('Content-disposition', 'attachment; filename=customers.csv');
        res.setHeader('Content-type', 'text/csv');
        res.status(200).send(toCSV(data));
        res.end();

    } catch (e) {
        console.error(e)
        return res.status(500).json({})
    }

});