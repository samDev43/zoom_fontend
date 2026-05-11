

import { Link } from "react-router-dom"
import { useEffect, useState} from "react"
import axios from "axios"
import { formatDate } from "../compoents/formatData"
import { Footer } from "../compoents/footer"
// import { Link } from "react-router-dom"


export function PublicBody() {
  const [ allPosts, setAllPost ] = useState([]);
  const [ filteredPosts, setFilteredPosts ] = useState([]);
  // const [ display, setDisplay ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('');
  // const [ userName, setUserName ] = useState('');
      let imageUrl = "https://zoom-backend-l0uq.onrender.com/api/"
  // const token = localStorage.getItem('token')
  
  
  useEffect(() =>{
    const getAllPost = async () => {
      const res = await axios.get(
        "https://zoom-backend-l0uq.onrender.com/api/getallposts.php"
      );      
        setAllPost(res.data.posts)
  }
  getAllPost()
}, [])

function handleSearch(e) {
  setSearchTerm( e.target.value);
  const filtered = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const contentMatch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const authorMatch = post.username.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || contentMatch || authorMatch;
  })
  setFilteredPosts(filtered);
  }
 
  const display =
    searchTerm.length > 0
       ? filteredPosts
       : allPosts;
  
  
  return(
    <>
          <div className="h-[76vh] bg-gradient-to-br from-[#0B1215] via-[#111C22] to-[#0F1720] w-full flex justify-center  items-center flex-col gap-5">
            <h1 className="pt-[20] font-extrabold text-2xl md:text-5xl text-white">Ideas, told <span className="text-[#39F3E2]">brilliantly</span>.</h1>
            <p className="text-[#94A3B8] w-[95%] md:w-[45%] lg:w-[30%] text-center text-lg">Read fresh perspectives, share your own, and join the conversation. Anyone can write on Lumen.</p>
            <Link to="createpost" className="
    mt-4
    px-7
    py-3
    rounded-2xl
    bg-gradient-to-r
    from-[#39F3E2]
    to-[#2ED3C4]
    text-[#0B1215]
    font-bold
    flex
    items-center
    gap-3
    hover:scale-105
    transition-all
    duration-300
    shadow-lg
    shadow-[#39F3E2]/20
  "><span>Start writing</span> <span className=""><i className="bi bi-arrow-right"></i></span></Link>
          </div>
          <div>
            <div className=" bg-[#0B1215] ">
              <div className=" pt-5  mx-auto lg:w-[70%] md:w-[80%] w-[95%] flex flex-col md:flex-row md:justify-between ">
              <div className="flex flex-col gap-2">
                 <h1 className="font-bold md:font-extrabold text-2xl md:text-5xl text-white">Latest posts</h1>
                 <p className="text-gray-500 text-lg">1 story so far</p>
              </div>
              <div>
                  <div className="
  flex
  items-center
  gap-3
  px-4
  py-3
  rounded-2xl
  bg-[#111C22]
  border
  border-[#22313A]
  focus-within:border-[#39F3E2]
  transition
"> 
                      <i className="text-gray-500 bi bi-search"></i>
                      <input
  className="
    bg-transparent
    w-full
    outline-none
    text-white
    placeholder:text-[#64748B]
  "
  placeholder="Search posts, authors..."
  type="search"
  onChange={(e) => handleSearch(e)}
/>
                 </div>
              </div>
            </div>
           
            {display.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 my-15 lg:grid-cols-3 gap-4 p-4 lg:w-[88%] md:w-[90%] w-[95%] mx-auto">
                      {display.map((post) => (
                          <Link to={`/posts/${post.id}`} key={post.id}  className="
                                  group
                                  rounded-3xl
                                  overflow-hidden
                                  bg-[#111C22]
                                  border
                                  border-[#22313A]
                                  hover:border-[#39F3E2]/50
                                  transition-all
                                  duration-300
                                  hover:-translate-y-1
                                  hover:shadow-2xl
                                  hover:shadow-[#39F3E2]/10
                                ">
                              <img className="
                                  w-full
                                  h-[240px]
                                  object-cover
                                  group-hover:scale-105
                                  transition-transform
                                  duration-500
                                " src={imageUrl + post.header_image} alt={post.title} />
                            <div className="p-5 flex flex-col gap-4">
                              <h2 className="
                                    text-white
                                    text-2xl
                                    font-bold
                                    line-clamp-2
                                  ">{post.title}</h2>
                              <p className="
                                text-[#94A3B8]
                                line-clamp-3
                                leading-relaxed
                              ">{post.content}</p>
                              <div className="flex justify-between items-center pt-2">
                                <div className="flex items-center gap-2 text-[#CBD5E1]"><i className="bi bi-person-circle  text-[#39F3E2]"></i> <p className="text-white">{post.username}</p></div>
                                <div className="text-sm text-[#64748B]">{formatDate(post.created_at)}</div>
                              </div>
                            </div>
                          </Link>
                      ))}
                  </div>
            )}

              {display.length === 0 && (
                  <Link to="/createpost" className="cursor-pointer  pb-20 ">
                   <div className="pb-30 ">
                     <div className="
                          h-[240px]
                          border
                          border-dashed
                          border-[#22313A]
                          bg-[#111C22]
                          hover:border-[#39F3E2]
                          transition
                          rounded-3xl
                          flex
                          justify-center
                          items-center
                          md:w-[60%]
                          w-[90%]
                          mx-auto
                          my-10
                        ">
                      <p className="text-gray-500 text-lg">No posts yet — be the first to write one!</p>
                    </div>
                   </div>
                  </Link>
              )}



           <Footer />
            </div>
          </div>
        </>
    )
}