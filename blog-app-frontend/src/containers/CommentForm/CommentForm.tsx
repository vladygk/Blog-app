import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import styles from "./CommentForm.module.scss";
import CommentService, {
  CommentInputFields,
} from "../../services/CommentService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const CommentForm: React.FC<{ postId: string; setIsCommentFormOpen: any; setIsCommentsOpen:any; }> = ({
  postId,
  setIsCommentFormOpen,
  setIsCommentsOpen
}) => {
  const { username, token } = useContext(AuthContext);
  const [commentInput, setCommentInput]: [
    CommentInputFields,
    Dispatch<SetStateAction<CommentInputFields>>
  ] = useState(()=>({content:'',authorName:username}));

  const navigator = useNavigate();
  

  const onChangeValue = (e: any) => {
    const { value } = e.target;
    setCommentInput((prevFormInput) => ({
      ...prevFormInput,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (Object.values(commentInput).some(val=>val==='')) {
      return;
    }
    try {
      await CommentService.createComment(
        { authorName: username, content: commentInput.content, postId: postId },
        token
      );

      setIsCommentFormOpen(false);
      setIsCommentsOpen(true);
    } catch {
      navigator("/error");
    }
  };

  return (
    <form className={styles.wrapper}>
      <TextArea
        value={commentInput.content}
        onChange={onChangeValue}
        id="content"
        name="content"
        labelText="Comment:"
        placeholder="Type comment.."
      />
      <Button label="Add" onClick={onSubmit} />
    </form>
  );
};

export default CommentForm;
