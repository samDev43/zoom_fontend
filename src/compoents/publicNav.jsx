import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
// import { UserContext } from "../UserContext"
// import { useContext } from "react"
import { useLogout } from "./signOut"
import { useNavigate } from "react-router-dom"

export function PublicNav({ auth }) {
  const [isNavVisible, setIsNavVisible] = useState(false)
  // const { user } = useContext(UserContext)
  const user =  JSON.parse(localStorage.getItem("user"));

  let ImageUrl = "https://myzoomapi.great-site.net/zoom_backend-main/src/api/public/uploads/"

  const navigate = useNavigate();
  const logOut = useLogout(navigate);

  const toggleNav = () => {
    setIsNavVisible(prev => !prev);
  }

  useEffect(() => {

          if (isNavVisible) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  
  // return () => {
  //   document.body.style.overflow = "auto";
  // };
  },[isNavVisible])

  return (
    <>
   
       
       <nav className="fixed top-0 right-0 left-0 bg-[#0F1720]/80 backdrop-blur-xl border-b border-[#22313A] z-50">
        <div className="lg:w-[80%] md:w-[75%] w-[95%] flex justify-between mx-auto py-5 z-50">
          <div className="flex items-center gap-2">
            <div className="
                    w-10 h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-[#39F3E2]
                    to-[#2ED3C4]
                    flex items-center justify-center
                    text-[#0B1215]
                    shadow-lg shadow-[#39F3E2]/20
                  ">
              <i className="bi bi-stars"></i>
            </div>
            <span className="font-black tracking-wider text-xl text-white">ZOOM</span>
          </div>
          {auth && (
            <div className="hidden md:flex jusstify-center gap-5 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg transition duration-300 ${isActive
                    ? "text-[#39F3E2] bg-[#16242C]"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#16242C]"
                  }`
                }>
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `relative px-3 py-2 rounded-lg transition duration-300 ${isActive
                    ? "text-[#39F3E2] bg-[#16242C]"
                    : "text-[#94A3B8] hover:text-white hover:bg-[#16242C]"
                  }`
                }
              >
                Dashboard
              </NavLink>

              {user?.role === "admin" && (
                <NavLink
                  to="/adminpanel"
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-lg transition duration-300 ${isActive
                      ? "text-[#39F3E2] bg-[#16242C]"
                      : "text-[#94A3B8] hover:text-white hover:bg-[#16242C]"
                    }`
                  }>
                  Admin
                </NavLink>
              )}

            </div>
          )}

          {!auth && (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="bg-[#39f3e2]/70 px-5 py-2 font-bold rounded text-[#102121]">
                Sign in
              </NavLink>
              <NavLink
                to="/signup"
                className="transition duration-300 box-border bg-[#102121] border border-[#39f3e2] text-[#39f3e2] px-5 py-2 font-bold rounded hover:bg-[#39f3e2]/70 hover:text-[#102121]">
                Get Started
              </NavLink>
            </div>

          )
          }
          {/* {auth && (
                     
                        <div className="flex items-center gap-[15px]">
                            <button className="bg-[#39f3e2]/80 rounded py-2 px-2 md:px-5 gap-2 md:gap-5 flex font-semibold"><span><i className="bi bi-pencil-square"></i></span> <NavLink to="/createpost">Write</NavLink></button>
                           <div className="w-10 h-10 rounded-full hover:bg-[#39f3e2]/80 font-semibold text-xl  flex items-center justify-center text-gray-400 transition duration-300">
                             <button onClick={() => {toggleNav()}}>A</button>
                           </div>
                        </div>  
                    )} */}
          {auth && (
            <div className="flex items-center gap-[15px]">


              <NavLink
                to="/createpost"
                className="
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
  "
              >
                <i className="bi bi-pencil-square"></i>
                <span>Write</span>
              </NavLink>

              <div  onClick={toggleNav} className="
  w-11 h-11
  rounded-full
  bg-[#16242C]
  border border-[#22313A]
  flex items-center justify-center
  overflow-hidden
  hover:border-[#39F3E2]
  transition duration-300
">
                <button>
                  {user?.profile ? (
                    <img
                      src={ImageUrl + user.profile}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    user?.username?.charAt(0).toUpperCase()
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isNavVisible  && (
        <div className={`${isNavVisible ? "block" : "hidden"} fixed right-4 top-16 z-50`}>
        <div  className="
      fixed
      inset-0
      bg-black/30
      backdrop-blur-sm
      flex
      justify-end
      items-start
      p-4
      pt-20
      auto
    "
     onClick={toggleNav}
    ></div>

        <div className="
          w-[260px]
          bg-[#111C22]/95
          backdrop-blur-xl
          text-white
          rounded-2xl
          shadow-2xl shadow-black/30
          overflow-hidden
          border border-[#22313A]
        ">

          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="font-semibold text-sm">{user?.username}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>

          {/* NavLinks */}
          <div className="py-2">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#2a2c35] transition"
            >
              <i className="bi bi-speedometer2"></i>
              <span>My Dashboard</span>
            </NavLink>

            <NavLink
              to="/createpost"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#2a2c35] transition"
            >
              <i className="bi bi-plus-square"></i>
              <span>New Post</span>
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/adminpanel"
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#2a2c35] transition"
              >
                <i className="bi bi-lock-fill"></i>
                <span>Admin Panel</span>
              </NavLink>
            )}

            <NavLink
              to="/setting"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#2a2c35] transition"
            >
              <i className="bi bi-gear"></i>
              <span>Settings</span>
            </NavLink>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-700">
            <button onClick={logOut} className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/20 text-red-400 transition">
              <i className="bi bi-box-arrow-right mr-2"></i>
              Sign Out
            </button>
          </div>

        </div>
      </div>
   )} 
    </>
  )
}