import React from 'react';
import styles from './NoAccessPage.module.scss';

const NoAccessPage:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>No access.</div>
        </div>
      );
}
 
export default NoAccessPage;