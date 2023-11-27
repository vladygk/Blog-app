import React from 'react';
import styles from './ErrorPage.module.scss';

const ErrorPage:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>IT'S AN ERROR.</div>
        </div>
      );
}
 
export default ErrorPage;