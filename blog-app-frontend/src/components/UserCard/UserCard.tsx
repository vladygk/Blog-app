import React from 'react';
import styles from './UserCard.module.scss';

export interface UserCardInput{
    username:string;
    email:string;
}

const UserCard:React.FC<UserCardInput> = ({username,email}) => {
    return ( <div className={styles.wrapper}>
        <div className={styles.username}> Username: {username}</div>
        <div>Email: {email}</div>
    </div> );
}
 
export default UserCard;
