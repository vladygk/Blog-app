import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import Input, { InputTypes } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextArea from "../../components/TextArea/TextArea";
import styles from "./PostForm.module.scss";
import PostService, { PostInputFields } from "../../services/PostService";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

interface PostInputErrors {
  title: false;
}



const PostForm: React.FC<{editMode:boolean}> = ({editMode}) => {
  const {username, token} = useContext(AuthContext);

  const [postInput, setPostInput]: [
    PostInputFields,
    Dispatch<SetStateAction<PostInputFields>>
  ] = useState(()=>({authorName:username, title:'',content:''}));
  
  const [postErrors, setpostErrors]: [
    PostInputErrors,
    Dispatch<SetStateAction<PostInputErrors>>
  ] = useState({ title: false });

  const { id } = useParams();

  useEffect(()=>{
    if(editMode && id){
      const fetchData = async () => {
        try {
          const data = await PostService.getOnePost(id);
          setPostInput(data);
        } catch (error) {
          navigator('/error');
        }
      };
      fetchData();    
    }
  },[]);


  const navigator = useNavigate();
  

  const onBlur = (e: any) => {
    const { value } = e.target;

    if (!value) {
      setpostErrors((prevFormInput) => ({
        ...prevFormInput,
        [e.target.name]: true,
      }));
    } else {
      setpostErrors((prevFormInput) => ({
        ...prevFormInput,
        [e.target.name]: false,
      }));
    }
  };

  const onChangeValue = (e: any) => {
    const { value } = e.target;
    setPostInput((prevFormInput) => ({
      ...prevFormInput,
      [e.target.name]: value,
    }));
  };


  const onSubmit = async (e:any) =>{
    e.preventDefault();
    
    if (Object.values(postErrors).some((err) => err === true)||Object.values(postInput).some((val) => val === '')) {
      return;
    }
    try {
      if(editMode && id){
        await PostService.editPost({title:postInput.title, content:postInput.content, authorName:username},id,token);
      }else{
      await PostService.createPost({title:postInput.title, content:postInput.content, authorName:username},token);
      
      }
      navigator("/posts");
    } catch {
      navigator("/error");
    }
  }

  return (
    <form className={styles.wrapper}>
      <div className={styles.title}>Create Post</div>
      <Input
        onBlur={onBlur}
        value={postInput.title}
        onChange={onChangeValue}
        id="title"
        name="title"
        labelText="Title:"
        inputType={InputTypes.Text}
        placeholder="Enter title.."
        hasError={postErrors.title}
      />
      <TextArea
        value={postInput.content}
        onChange={onChangeValue}
        id="content"
        name="content"
        labelText="Content:"
        placeholder="Type post.."
      />
      <Button label={editMode?'Edit Post':'Create Post'} onClick={onSubmit} />
    </form>
  );
};

export default PostForm;
