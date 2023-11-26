import React from 'react';
import styles from './Footer.module.scss';

const Footer:React.FC = () => {
    return (  
        <footer className={styles.container}>
             <div className={styles.footerText}>Powered by blog app technology&reg; 2023</div>
        </footer>
    );
}
 
export default Footer;