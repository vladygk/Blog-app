import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomeTitle.module.scss";
import blogAppLogo from "../../assets/images/blog-app-logo.png";

const HomeTitle: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Link className={styles.link} to="/">
          <div className={styles.box}>
            <img className={styles.image} src={blogAppLogo} />
            <div className={styles.title}>Blog App</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default HomeTitle;
