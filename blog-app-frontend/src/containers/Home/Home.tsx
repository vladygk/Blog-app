import React from 'react';

import background2 from "../../assets/images/home-img.svg";
import styles from './Home.module.scss';

const Home:React.FC = () => {
    return ( <div className={styles.wrapper}>
        <div className={styles.text}>It's blogging time!</div>
        <img className={styles.image} src={background2}/>
    </div> );
}
 
export default Home;
