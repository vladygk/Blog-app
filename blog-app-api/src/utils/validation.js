const validatePostInput = (title, content,authorId)=>{
    return title && content && authorId;
}
const validateCommentInput = (postId, content,authorId)=>{
    return postId && content && authorId;
}

module.exports = {validatePostInput,validateCommentInput};