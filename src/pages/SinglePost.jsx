
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PublicNav } from "../compoents/publicNav";
import { isLoggedIn } from "../compoents/auth";
import { formatDate } from "../compoents/formatData";
import { Link } from "react-router-dom";
import { Footer } from "../compoents/footer"
import { Comment } from "../compoents/comment";
import { deletPost } from "../compoents/deletPost";
import { useNavigate } from "react-router-dom";
import  ConfirmModal from "../compoents/modal/confirmModal";
// import { set } from "zod";

export function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [toHome, setToHome] = useState(false)
  const [comments, setComments] = useState([]);
  const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
  let postId = post.id

  const navigate = useNavigate()
  const auth = isLoggedIn();
  // const token = localStorage.getItem('token')
  let ImageUrl = "http://localhost/ZOOM_BACKEND/src/api/public/uploads/"

  useEffect(() => {
    const getSinglePost = async () => {
      console.log(id);

      const res = await axios.get(
        `http://localhost/ZOOM_BACKEND/src/api/get_single_post.php?id=${id}`,
      )
      console.log(res.data);
      setPost(res.data.data)
      setComments(res.data.comments)


    }
    getSinglePost()
  }, [id])
  console.log(post.title);

  if (toHome) {
    navigate("/")
    setToHome(false)
  }

  return (
    <div>
      <PublicNav auth={auth} />
      <div className="pb-20 bg-gradient-to-b from-[#0B1215] to-[#111C22] ">
        <div className="max-w-4xl w-[92%] mx-auto">
          <div className="pt-[160px]">
            <Link to="/" className="
    inline-flex
    items-center
    gap-2
    text-[#94A3B8]
    hover:text-[#39F3E2]
    transition
    text-sm
    font-medium
  ">   <i className="bi bi-arrow-left"></i>  <p className="text-white">Back to all posts</p></Link>
            <h1 className="
  text-white
  text-4xl
  md:text-6xl
  font-black
  tracking-tight
  leading-tight
  py-6
">{post.title}</h1>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="flex items-center gap-5 text-lg text-white">
                <div className="flex items-center gap-2 text-[#94A3B8]">
                  <i className="bi bi-person text-[#39F3E2]"></i> 
                  <p>{post.username}</p>
                </div>
                <div className="flex items-center gap-2 text-[#94A3B8]">
                  <i className="bi bi-calendar2 text-[#39F3E2]"></i>
                  <p>{formatDate(post.created_at)}</p>
                </div>
              </div>
              {/* <div onClick={() => { deletPost(post.id, setToHome) }} className=" */}
              <div onClick={() => { setOpenDeleteModal(true) }} className="
    flex
    items-center
    gap-2
    px-5
    py-3
    rounded-2xl
    bg-[#16242C]
    border
    border-[#22313A]
    text-red-400
    hover:bg-red-500
    hover:text-white
    transition-all
    duration-300
    cursor-pointer
  ">
                <i className="bi bi-trash"></i>
                <p >Delete</p></div>
                <ConfirmModal
                    isOpen={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onConfirm={() => deletPost(post.id, setToHome)}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this post? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                />
            </div>
          </div>
          <div>
            <img className="
                  w-full
                  h-[280px]
                  md:h-[450px]
                  object-cover
                  rounded-3xl
                  shadow-2xl
                  shadow-black/30
                  border
                  border-[#22313A]
                  my-12
                " src={ImageUrl + post.header_image} alt="" />
          </div>
          <p className="text-gray-300 leading-loose text-[18px] py-15">{post.content}</p>
          <div className="flex gap-2 items-center text-[#94A3B8] text-lg font-semebold pb-15 cursor-pointer"> <i className="bi bi-chat-dots text-[#39F3E2]"> </i> {comments.length} <p>comment</p></div>
          <div>
            <div className="text-2xl font-bold text-white pb-8">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className=" my-4 flex items-start gap-3">

                    <img
                      className="
                          h-11
                          w-11
                          min-w-[44px]
                          rounded-full
                          object-cover
                          border
                          border-[#22313A]
                        "
                      src={ImageUrl + comment.profile_picture}
                      alt=""
                    />

                    <div className="flex flex-col gap-1 bg-[#16242C] border border-[#22313A] py-2 px-4 rounded-xl w-full">
                      <p className="text-sm font-semibold text-white">{comment.username}</p>
                      <p className="text-[#CBD5E1] leading-relaxed break-words">{comment.content}</p>
                    </div>

                  </div>
                ))
              ) : (
                <p className="
  bg-[#111C22]
  border
  border-dashed
  border-[#22313A]
  rounded-3xl
  py-12
  text-center
">
                  No comment yet.Start the conversation
                </p>
              )}
            </div>
            {/* <div className="flex justify-start text-2xl text-white font-bold pb-15"><p>No comment  yet</p></div> */}
          </div>
          <Comment postId={postId} setComments={setComments} />
        </div>
      </div>
      <Footer />
    </div>
  )
}