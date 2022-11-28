import styles from "../../styles/Home.module.css";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>
                Copyright © 2022 RE:SHRD
            </span>

            <a
                href="https://github.com/kubo550"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span className={styles.logo}>
                    Jakub Kurdziel
              </span>
            </a>
        </footer>
    );
}