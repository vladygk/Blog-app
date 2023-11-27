export interface PostInputFields{
    authorName: string;
    title:string;
    content:string;
}


class PostService{
    getAllPosts = async ()=>{
        const url = "http://localhost:5000/posts";
        const response = await fetch(url);
        if(response.status>=400){
            throw new Error('Request failed')
        }
        const data = await response.json();
        return data;
    }

    getOnePost = async (id:string)=>{
        const url = `http://localhost:5000/posts/${id}`;
        const response = await fetch(url);
        if(response.status>=400){
            throw new Error('Request failed')
        }
        const data = await response.json();
        return data;
    }

    createPost = async (input:PostInputFields,token:string)=>{
        const url = `http://localhost:5000/posts`;
        const response = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":token,
            },
            body:JSON.stringify(input)
        });

        if(response.status>=400){
            throw new Error('Request failed')
        }
    }

    editPost = async (input:PostInputFields,id:string,token:string)=>{
        const url = `http://localhost:5000/posts/${id}`;
        const response = await fetch(url,{
            method:"PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization":token,
            },
            body:JSON.stringify(input)
        });
        if(response.status>=400){
            throw new Error('Request failed')
        }

        const data = await response.json();
        return data;
    }

    deletePost = async (id:string,token:string)=>{
        const url = `http://localhost:5000/posts/${id}`;
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

export default new PostService();