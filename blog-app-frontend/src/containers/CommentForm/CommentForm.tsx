import React from 'react';
import TextArea from '../../components/TextArea/TextArea';
import Button from '../../components/Button/Button';
import styles from './CommentForm.module.scss';

const CommentForm:React.FC = () => {
    return (
        <form className={styles.wrapper}>
            <TextArea 
             id="comment"
             name="comment"
             labelText="Comment:"
             placeholder="Type comment.."
            />
            <Button label='Add' onClick={()=>{}}/>
        </form>
      );
}
 
export default CommentForm;
