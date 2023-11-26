import React from "react";
import styles from './CommentCard.module.scss';
import { FaArrowRightLong } from "react-icons/fa6";

const CommentCard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>Bobi Mihailow</div>
      <FaArrowRightLong size={40}/>
      <p className={styles.content}>Mega div comentar cvovecheeee</p>
    </div>
  );
};

export default CommentCard;
