import React, { useContext } from "react";
import styles from './CommentCard.module.scss';
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import CommentService from "../../services/CommentService";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface CommentCardProps{
  content:string;
  authorName:string;
  _id:string;
  setIsDeleting:any;
}

const CommentCard: React.FC<CommentCardProps> = ({content,authorName,_id,setIsDeleting}) => {
  const {token,username} = useContext(AuthContext);
  const navigator =useNavigate();

  const onDelete = async (id:string)=>{
    try{
    await CommentService.deleteComment(_id,token);
    setIsDeleting((state:boolean)=>!state);
    
    }catch{
      navigator('/error');
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>{authorName}</div>
      <FaArrowRightLong size={40}/>
      <p className={styles.content}>{content}</p>
      {username === authorName && <MdDeleteForever onClick={()=>onDelete(_id)} className='iconButton' size={40}/>}
    </div>
  );
};

export default CommentCard;
