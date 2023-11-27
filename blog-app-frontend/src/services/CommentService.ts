export interface CommentInputFields{
    authorName: string;
    content:string;
    postId?:string;
}


class CommentService{
    getAllComments = async (postId:string)=>{
        const url = `http://localhost:5000/comments/?postId=${postId}`;
        const response = await fetch(url);
        if(response.status>=400){
            throw new Error('Request failed')
        }
        const data = await response.json();
        return data;
    }


    createComment = async (input:CommentInputFields,token:string)=>{
        const url = `http://localhost:5000/comments`;
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":token,
            },
            body:JSON.stringify(input)
        });

        if(response.status>=400){
            throw new Error('Request failed');
        }
    }

   

    deleteComment = async (id:string,token:string)=>{
        const url = `http://localhost:5000/comments/${id}`;
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization":token,
            },
        });
        if(response.status>=400){
            throw new Error('Request failed')
        }
    }

}

export default new CommentService();