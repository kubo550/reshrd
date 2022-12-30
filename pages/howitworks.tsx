import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Howitworks() {
    return (
        <div className={styles.container}>
            <Head>
                <title>How it works - Updateable QR Clothing Control Panel | RESHRD</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    About us
                </h1>

                <p className={styles.description}>
                    some info about us
                </p>
            </main>
        </div>
    )
}
