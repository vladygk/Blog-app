import React, { useContext, useState } from "react";
import styles from "./PostCard.module.scss";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaAngleRight,FaPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CommentsCatalog from "../../containers/CommentsCatalog/CommentsCatalog";
import PostService from "../../services/PostService";
import AuthContext from "../../context/AuthContext";
import CommentForm from "../../containers/CommentForm/CommentForm";
import { SlMagnifier } from "react-icons/sl";

export interface PostCartProps{
  _id:string;
  authorName:string;
   title:string;
    content:string;
    setIsDeleting:any;
}



const PostCard: React.FC<PostCartProps> = ({_id,authorName, title, content,setIsDeleting}) => {
  const {token, username} = useContext(AuthContext);
  const navigator = useNavigate();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);

  const getDate =()=> {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const deletePost = async()=>{
    const userConfirmed = window.confirm("Do you want to delete the post?");
    if(!userConfirmed){
      return;
    }

    try{
     await PostService.deletePost(_id,token); 
     setIsDeleting((state:boolean)=>!state);
     navigator('/posts');
    }catch{
      navigator('/error');
    }
  }

  const openCommentsCatalog = ()=>{
    setIsCommentsOpen((state)=>!state);
    setIsCommentFormOpen(false);
  }
  const openCommentsForm = ()=>{
    setIsCommentsOpen(false);
    setIsCommentFormOpen((state)=>!state);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.detailsWrapper}>
        <div className={styles.author}>{authorName}</div>
        <div className={styles.date}>{getDate()}</div>
      </div>
      <p className={styles.content}>
       {content}
      </p>
      <div className={styles.controlsWrapper}>
        <div className={styles.commentControls}>
          <FaAngleRight onClick={openCommentsCatalog} className={isCommentsOpen? `${styles.iconButtonRotated} iconButton`:'iconButton'} size={40}/>
          {token &&
          <FaPlusSquare onClick={openCommentsForm} className='iconButton' size={40}/>
          }
        </div>
        <div className={styles.postControls}>
          {authorName === username &&
          <Link className={styles.link} to={`/posts/${_id}/edit`}><FaEdit  size={40}/></Link>}
          {authorName === username &&
          <MdDelete className='iconButton' onClick={deletePost}  size={40}/>}
           <Link className={styles.link} to={`/posts/${_id}`}><SlMagnifier size={40} /></Link>
        </div>
      </div>
      {isCommentsOpen&&<CommentsCatalog postId={_id}/>}
      {isCommentFormOpen &&<CommentForm setIsCommentsOpen={setIsCommentsOpen} setIsCommentFormOpen={setIsCommentFormOpen} postId={_id}/>}
    </div>
    
  );
};

export default PostCard;
