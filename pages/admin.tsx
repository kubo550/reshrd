import Head from 'next/head'
import {useCallback, useState} from "react";
import axios, {AxiosResponse} from "axios";
import styles from '../styles/Home.module.css'


function download(data: any, filename: string, type: string) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.setAttribute('download', `${filename}.${type}`);
    link.setAttribute('href', url);
    document.body.appendChild(link);
    link.click();
}

export default function Admin() {

    const [isReportLoading, setIsReportLoading] = useState(false);


    const handleDownloadReport = useCallback(async () => {
        setIsReportLoading(true);

        const report = await axios.get('/api/items-report', {
            responseType: 'blob',
            headers: {
                'Authorization': `Basic abcdefg123456`
            }
        });

        download(report.data, 'report', 'json');
        setIsReportLoading(false);

    }, []);


    return (
        <div className={styles.container}>
            <Head>
                <title>Admin Panel</title>
            </Head>


            <main className={styles.main}>
                <h1>Admin Panel</h1>
                <p>
                    Download the customers report
                </p>

                <button onClick={handleDownloadReport}>
                    {isReportLoading ? 'Loading...' : 'Download'}
                </button>

            </main>
        </div>
    )
}
