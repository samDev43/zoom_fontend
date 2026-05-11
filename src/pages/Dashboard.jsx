import { PublicNav } from "../compoents/publicNav"
import { isLoggedIn } from "../compoents/auth"
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { formatDate } from "../compoents/formatData"
import { Footer } from "../compoents/footer"
import { UserContext } from "../UserContext"
import { useContext } from "react"
import { deletPost } from "../compoents/deletPost"
import ConfirmModal from "../compoents/modal/confirmModal"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"




export function Dashbord() {
  const [myPosts, setMyPosts] = useState([]);
  const [userName, setUserName] = useState('');
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const auth = isLoggedIn()
  // let imageUrl = "https://zoom-backend-l0uq.onrender.com/api/public/uploads/"
  useEffect(() => {
    // Fetch user data and posts here using axios
    const getUserPosts = async () => {
      let token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "https://zoom-backend-l0uq.onrender.com/api/getuserposts.php",
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
            withCredentials: true,

          }
        );
       
        if(res.data.status === "success") {
          console.log(res.data);
          setMyPosts(res.data.data);
          setUserName(res.data.user);
        }else{
          toast.error("Failed to fetch posts");
           setTimeout(() => {
            navigate("/login");
           },1500)
        }
        

      }
      catch (err) {
        console.log(err);
      }
    }

    getUserPosts();
  }, []);


  return (
    <>
      <PublicNav auth={auth} user={user} />
      <div className="pb-25 h-screen overflow-hidden  bg-gradient-to-b from-[#0B1215] to-[#111C22]">
        <div className="pt-[200px] flex md:flex-row flex-col items-start justify-start md:justify-between md:items-center lg:w-[60%] md:w-[80%] w-[90%] mx-auto">
          <div className=" flex flex-col gap-2">
            <h1 className="flex items-center gap-2"><p className="text-white font-bold text-4xl">HI,</p> <p className="text-white font-bold text-4xl">{userName} 👋</p>  </h1>
            <p className="text-[#94A3B8] text-lg">user ·  posts</p>
          </div>
          <Link to="/createpost" className="
    flex items-center gap-2
    px-5 py-2.5
    rounded-xl
    bg-gradient-to-r
    from-[#39F3E2]
    to-[#2ED3C4]
    text-[#0B1215]
    font-semibold
    hover:scale-[1.03]
    transition
    shadow-lg shadow-[#39F3E2]/20
  "><i className="bi bi-pencil-square"></i> New Post</Link>
        </div>

        {/* <div className="grid grid-cols-1 w-[90%] md-[80%] lg-[70%] mx-auto mt-10">
               
            </div> */}

        {myPosts.length > 0 && (
          <div className="grid grid-cols-1 gap-10 w-[90%] md:w-[80%] lg:w-[60%] mx-auto mt-10">
            {myPosts.map((post) => (
              <div key={post.id} className="text-white flex flex-col md:flex-row md:justify-between justify-center p-4 rounded-lg bg-[#13161e] ">
                <div className="p-4">
                  <h1 className="text-lg">{post.title}</h1>
                  <p className="text-sm text-gray-500">{post.content}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                </div>
                <div className="flex items-center gap-3">

                  <Link
                    to={`/posts/${post.id}`}
                    className="
      flex items-center gap-2
      px-4 py-2
      rounded-xl
      bg-[#16242C]
      border border-[#22313A]
      text-[#E2E8F0]
      hover:bg-[#39F3E2]
      hover:text-black
      transition duration-300
    "
                  >
                    <i className="bi bi-eye"></i>
                    <p className="text-sm font-medium">View</p>
                  </Link>

                  <button
                    // onClick={() => deletPost(post.id, setMyPosts)}
                     onClick={() => setOpenDeleteModal(true)}
                    className="
                        w-10 h-10
                        flex items-center justify-center
                        rounded-xl
                        bg-[#16242C]
                        border border-[#22313A]
                        text-red-400
                        hover:bg-red-500
                        hover:text-white
                        transition duration-300
                      "
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <ConfirmModal
                    isOpen={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    onConfirm={() => deletPost(post.id, setMyPosts)}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this post? This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                  />

                </div>
              </div>
            ))
            }
          </div>
        )}

        {myPosts.length == 0 && (
          <div className="h-screen  bg-gradient-to-b from-[#0B1215] to-[#111C22]">
            <div className="flex flex-col mt-10 justify-center gap-5 hover:border-[#39f3e2]/80  hover:border items-center w-[60%] text-gray-500 rounded-2xl mx-auto mt-[30px] py-[50px] bg-[#111C22]/90  backdrop-blur-xl border border-[#22313A] transition duration-300">
              <i className="text-3xl bi bi-pencil-square"></i>
              <p>You haven't written anything yet.</p>
              <Link to="/createpost" className="py-2 px-3 bg-[#39f3e2]/80 rounded-xl hover:scale-105 transition duration-300 text-[#0B1215]">Write your first post</Link>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  )
}