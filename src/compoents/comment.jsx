import axios from "axios"   
import { useState } from "react";
import z from "zod";

  const commentSchema = z.object({
    comment : z.string().nonempty("comment is required").min(1, "Input should not be empty"),
  })

export function Comment({ postId, setComments  }) {
    const [ comment, setComment ] = useState("");

    async function postComment(){
        const result = commentSchema.safeParse({ comment });
        
        if (!result.success) {
            console.log('failed');
            
            console.log(result.error.format());
            return;
        }
        let token =  localStorage.getItem("token");
        if(!token){
            console.log("you need to login to post a comment");
            return;
        }
        try{
            
            const res = await axios.post(
                "https://myzoomapi.great-site.net/api/postComent.php",
                { comment, postId },
                {
                    headers : { "Authorization" : `Bearer ${token}` }
                },  
                
                
            )
            console.log(res.data);
            
            setComments(res.data.comments);
            setComment("") // Clear the input field after posting the comment
            
        }catch (err) {
        console.log(err);
    }

    }

    // async function fetchComments() {
    //     try {
    //         const res = await axios.get(
    //         `https://myzoomapi.great-site.net/api/getComments.php?post_id=${postId}`
    //         );

    //         (res.data.comments);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    // useEffect(() => {
    //     fetchComments();

    // }, [commentss]);

    return(
        <>
         <div className="fixed bottom-0 left-0 right-0 flex justify-center px-3 pb-20">
            <div className="w-full max-w-2xl flex items-center gap-2 bg-[#23252e] rounded-full px-3 py-2">
                
                <i className="bi bi-chat-left-fill text-white"></i>

                <input
                className="flex-1 bg-transparent text-white outline-none px-2"
                type="text"
                placeholder="Post your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />

                <button 
                onClick={postComment}
                className="w-9 h-9 flex justify-center items-center rounded-full bg-white"
                >
                <i className="bi bi-arrow-up text-black"></i>
                </button>

            </div>
        </div>
        </>
    )
}