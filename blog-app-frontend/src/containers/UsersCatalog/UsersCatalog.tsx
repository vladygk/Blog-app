import React from "react";
import UserCard from "../../components/UserCard/UserCard";
import styles from "./UsersCatalog.module.scss";

const UsersCatalog: React.FC = () => {
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
        <div className={styles.title}>All Users:</div>
      <div className={styles.row}>
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <div className={styles.row}>
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <div className={styles.row}>
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
    </div>
  );
};

export default UsersCatalog;
