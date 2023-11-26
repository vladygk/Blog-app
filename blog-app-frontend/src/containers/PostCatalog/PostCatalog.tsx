import React from "react";
import styles from "./PostCatalog.module.scss";
import PostCard from "../../components/PostCard/PostCard";
import CommentsCatalog from "../CommentsCatalog/CommentsCatalog";

const PostCatalog: React.FC = () => {
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
       <div className={styles.title}>Posts:</div>
      <PostCard />
      <CommentsCatalog/>
    </div>
    </div>
  );
};

export default PostCatalog;
