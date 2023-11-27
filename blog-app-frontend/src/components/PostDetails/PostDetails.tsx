import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./PostDetails.module.scss";
import PostService from "../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button/Button";

interface PostDetailsProps {
  authorName: string;
  title: string;
  content: string;
}

const PostDetails: React.FC = () => {
    const [postInfo,setPostInfo]:[PostDetailsProps,Dispatch<SetStateAction<PostDetailsProps>>] 
    = useState({authorName:'',title:'',content:''});
    const {id} = useParams();
    const navigator = useNavigate();
  
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await PostService.getOnePost(id||'');
              setPostInfo(data);
            } catch (error) {
              navigator('/error');
            }
          };
          fetchData();
    },[]);
    const onClick = ()=>{
      navigator('/posts');
    }
  return (
   
      <div className={styles.wrapper}>
        <div className={styles.title}>{postInfo.title}</div>
        <div className={styles.content}>{postInfo.content}</div>
        <Button label="Back" onClick={onClick} />
      </div>
    
  );
};

export default PostDetails;
