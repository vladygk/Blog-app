const validatePostInput = (title, content,authorName)=>{
    return title && content && authorName;
}
const validateCommentInput = (postId, content,authorName)=>{
    return postId && content && authorName;
}

module.exports = {validatePostInput,validateCommentInput};