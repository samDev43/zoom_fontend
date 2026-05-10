import axios from "axios";
// import { useNavigate } from "react-router-dom";


export async function  deletPost (postId, setPosts, setToHome) {
    const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    
    
    try {
         const res = await axios.post(
        "https://myzoomapi.great-site.net/zoom_backend-main/src/api/deletPost.php",
        {post_id : postId},
        {
            headers : {"Authorization" : `Bearer ${token}`},
            withCredentials: true,
        },
    )
      if(res.data.status === "success"){
        if(setToHome) setToHome(true)
        if(setPosts) setPosts(prevPosts => prevPosts.filter(post => post.id !== postId))
        window.location = "/";

      }
     }catch (err) {
            console.log(err);
     }
    
    
}