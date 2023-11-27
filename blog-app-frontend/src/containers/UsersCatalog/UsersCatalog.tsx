import React, { useEffect, useState } from "react";
import UserCard, { UserCardInput } from "../../components/UserCard/UserCard";
import styles from "./UsersCatalog.module.scss";
import UserService from "../../services/UserService";

const UsersCatalog: React.FC = () => {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UserService.getAllUsers();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>All Users:</div>
        <div className={styles.usersWrapper}>
          {allUsers.map((user: UserCardInput, index) => {
            return (
              <UserCard
                username={user.username}
                key={index}
                email={user.email}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UsersCatalog;
