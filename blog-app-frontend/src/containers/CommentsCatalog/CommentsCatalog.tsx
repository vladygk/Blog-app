import React, { useEffect, useState } from 'react';
import CommentCard,{CommentCardProps} from '../../components/CommentCard/CommentCard';
import styles from './CommentsCatalog.module.scss';
import CommentService from '../../services/CommentService';
import { useNavigate } from 'react-router-dom';

const CommentsCatalog:React.FC<{postId:string}> = ({postId}) => {
    const [comments,setComments] = useState([]);
    const [isDeleting,setIsDeleting]= useState(false);
    const navigator =useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await CommentService.getAllComments(postId);
            setComments(data);
          } catch (error) {
            navigator('/error');
          }
        };
        fetchData();
        console.log('here');
      }, [isDeleting]);

    return (
        <div className={styles.wrapper}>
            {comments.map((comment:CommentCardProps,index)=>{
                return <CommentCard setIsDeleting={setIsDeleting} key={index} content={comment.content} authorName={comment.authorName} _id={comment._id}/>
            })}
        </div>
      );
}
 
export default CommentsCatalog;
