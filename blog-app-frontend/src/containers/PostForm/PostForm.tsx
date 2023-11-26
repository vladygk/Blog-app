import React from 'react';
import Input,{InputTypes} from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TextArea from '../../components/TextArea/TextArea';
import styles from './PostForm.module.scss'

const PostForm:React.FC = () => {  
        return ( 
            <form className={styles.wrapper}>
            <div className={styles.title}>Create Post</div>
            <Input
              id="title"
              name="title"
              labelText="Title:"
              inputType={InputTypes.Text}
              placeholder="Enter title.."
            />
            <TextArea
              id="content"
              name="content"
              labelText="Content:"
              placeholder="Type post.."
            />           
            <Button label="Create post" onClick={() => {}} />
          </form>
      );
}
 
export default PostForm;
