import React from "react";
import styles from "./PostCatalog.module.scss";
import PostCard from "../../components/PostCard/PostCard";
import CommentsCatalog from "../CommentsCatalog/CommentsCatalog";
import UserCard from "../../components/UserCard/UserCard";

const PostCatalog: React.FC = () => {
  return (
    <div className={styles.wrapper}>
       <div className={styles.title}>Posts:</div>
      <PostCard />
      <CommentsCatalog/>
    </div>
  );
};

export default PostCatalog;
