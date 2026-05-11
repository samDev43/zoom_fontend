import { PublicNav } from "../compoents/publicNav"
import { isLoggedIn } from "../compoents/auth"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import  axios  from "axios"
import { Footer } from "../compoents/footer"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { useContext } from "react"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
// import { ca } from "zod/locales"

const productSchema = z.object({
      title : z.string().nonempty("title is required").max(100, "it should be more than 100"),
      excerpt : z.string().max(200, "excerpt should be less than 200 characters").nonempty("excerpt is required"),
      content : z.string().nonempty("content is required").max(2000, "content should be less than 2000 characters"),
      cover_image : z.any().optional()
});
export function CreatePost(){
   const { user } = useContext(UserContext);
   const { register, handleSubmit, setValue, formState: { errors } } = useForm({resolver: zodResolver(productSchema)});
   // console.log(errors);
   // console.log(user.username);
   
   
    const auth = isLoggedIn()
    const navigate = useNavigate();

    const onSubmit = async (data) => {
      let token = localStorage.getItem("token");
      // console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("excerpt", data.excerpt);
      formData.append("content", data.content);
      
      if(data.cover_image?.[0]){
          formData.append("cover_image", data.cover_image[0])
      }

         
      try{
         const res = await axios.post("https://zoom-backend-l0uq.onrender.com/api/createpost.php", 
            formData,
            {
            headers: {
               // "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,
         });
         // const result = await res.json();
         console.log("FROM BACKEND" + " " + res.data);
         if(res.data.status === "success") {
            toast.success("Post created successfully!");
         } else {
            toast.error(res.data.message || "Failed to create post. Please try again.");
            console.log("FROM BACKEND" + " " + res.data);
         }
         console.log("FROM BACKEND" + " " + res.data);
         setTimeout(() => {
            navigate("/");
         }, 2000)
      }catch (err) {
         console.log(err);
      }
      
    }
    
    return(
        <>
          <PublicNav  auth={auth} user={user} />
          <div  className="min-h-screen bg-gradient-to-br from-[#0B1215] via-[#111C22] to-[#0F1720]">
             <form className="pb-20 lg:w-[50%] md:w-[80%] w-[92%] mx-auto pt-[120px]" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
               <div className="
                        bg-[#111C22]/80
                        backdrop-blur-md
                        border border-[#22313A]
                        rounded-3xl
                        p-8
                        shadow-2xl
                     ">
                    <p className="text-white font-bold text-4xl tracking-tight">Create new post</p>
                    <p className="text-[#94A3B8] text-lg mt-2">Write in markdown. Use **bold**, ## headings, code blocks, and more.</p>
               </div>
               <div className="pt-[40px] flex flex-col gap-5">
                  <p className="text-white font-semibold"> Title</p>
                  <input 
                        {...register("title")}
                        className="
  w-full
  p-4
  bg-[#16242C]
  border border-[#22313A]
  text-white
  rounded-xl
  outline-none
  focus:border-[#39F3E2]
  focus:ring-2
  focus:ring-[#39F3E2]/20
  transition
"  
                        placeholder="Header" type="text"  
                        id="title"
                        name="title"
                    />
                    <p className="text-red-500">{errors.title?.message}</p>
               </div>

                <div className="pt-[40px] flex flex-col gap-5">
                  <p className="text-white font-semibold"> Excerpt</p>
                  {/* <input className="p-2 bg-black text-gray-500 rounded-lg"  placeholder="Header" type="text"  /> */}
                  <textarea 
                    {...register("excerpt")}
                    placeholder="Text shown on home page"
                    className="
  w-full
  p-4
  bg-[#16242C]
  border border-[#22313A]
  text-white
  rounded-xl
  outline-none
  focus:border-[#39F3E2]
  focus:ring-2
  focus:ring-[#39F3E2]/20
  transition
"  name="excerpt" id="excerpt"></textarea>
                    <p className="text-red-500">{errors.excerpt?.message}</p>
               </div>

               <div>
                  <label htmlFor="file-input" className="text-[#94A3B8] text-lg pb-5 my-2">Cover image (optional)</label>
                   <label htmlFor="file-input" className="
    w-full
    h-[180px]
    bg-[#16242C]
    border-2
    border-dashed
    border-[#22313A]
    hover:border-[#39F3E2]
    transition
    rounded-2xl
    flex
    flex-col
    justify-center
    items-center
    gap-3
    text-[#94A3B8]
    cursor-pointer
  ">
                     <i className="bi bi-image"></i>
                     <span>Click to upload file</span>
                     <input 
                        // {...register("cover_image")}
                           type="file"
                           id="file-input" 
                           name="file-input" 
                           className="hidden"      
                           onChange={(e) => {
                              setValue("cover_image", e.target.files)
                           }}
                         />
                   </label>
               </div>

               <div>
                  <div className="flex justify-between items-center text-white pt-[30px]">
                    <p>Content (Markdown)</p>
                    <div className="flex gap-5">
                        {/* <button className="py-2 px-5 rounded bg-[#39f3e2]/70">Write</button>
                        <button className="py-2 px-5 rounded hover:border hover:border-[#39f3e2]/70">Preview</button> */}
                    </div>
                  </div>
                  <div className="flex flex-col mt-[20px]">
                     <textarea  className="
  w-full
  p-4
  bg-[#16242C]
  border border-[#22313A]
  text-white
  rounded-xl
  outline-none
  focus:border-[#39F3E2]
  focus:ring-2
  focus:ring-[#39F3E2]/20
  transition
"  
                     {...register("content")}
                     name="content" id="content"></textarea>
                     <p className="text-red-500">{errors.content?.message}</p>
                     <div className="flex justify-end my-[15px] gap-5 text-white">
                        <Link to="/" className="
    py-3
    px-6
    rounded-xl
    border
    border-[#22313A]
    text-white
    hover:border-red-400
    hover:text-red-400
    transition
  ">Cancle</Link>
                        <button type="submit" className="
    py-3
    px-6
    rounded-xl
    bg-[#39F3E2]
    text-black
    font-semibold
    hover:bg-[#2ED3C4]
    transition
    shadow-lg
    shadow-[#39F3E2]/20
  ">Public</button>
                    </div>
                  </div>
               </div>
             </form>
             <Footer />
          </div>
        </>
    )
}