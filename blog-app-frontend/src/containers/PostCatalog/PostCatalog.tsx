import React, { useContext, useEffect, useState } from "react";
import styles from "./PostCatalog.module.scss";
import PostCard,{PostCartProps} from "../../components/PostCard/PostCard";

import PostService from "../../services/PostService";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PostCatalog: React.FC = () => {
  const [posts,setPosts] = useState([]);
  const [isDeleting,setIsDeleting]= useState(false);

  const navigator = useNavigate();
  const {token} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PostService.getAllPosts();
        setPosts(data);
      } catch (error) {
        navigator('/error');
      }
    };
    fetchData();
    console.log('here');
  }, [isDeleting]);

  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
       <div className={styles.title}>Posts:</div>
       {token && <Link className={styles.link}to='/posts/create'>Create new post</Link>}
       {posts.map((post:PostCartProps,index) => {
        return <PostCard setIsDeleting={setIsDeleting} _id={post._id} key={index} authorName={post.authorName} title={post.title} content={post.content} />
       })}  
    </div>
    </div>
  );
};

export default PostCatalog;
