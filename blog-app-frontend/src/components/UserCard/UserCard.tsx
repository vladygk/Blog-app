import React from 'react';
import styles from './UserCard.module.scss';

const UserCard:React.FC = () => {
    return ( <div className={styles.wrapper}>
        <div className={styles.username}> Username: Borislav Mihailow</div>
        <div>Email: bobi@alkohola.com</div>
    </div> );
}
 
export default UserCard;
