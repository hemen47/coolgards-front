import Head from 'next/head'
import styles from './home.module.scss'

export default function Home() {
    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <h1 className={styles.title}>home</h1>
            </main>


        </div>
    )
}
