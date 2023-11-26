import React from 'react';
import CommentCard from '../../components/CommentCard/CommentCard';
import styles from './CommentsCatalog.module.scss';

const CommentsCatalog:React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
            <CommentCard/>
        </div>
      );
}
 
export default CommentsCatalog;
