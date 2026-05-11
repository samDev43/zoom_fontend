import {  useState } from "react"
import { PublicNav } from "../compoents/publicNav"
import { Link } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

 const productSchema = z.object({
    username : z.string().nonempty("title is required").min(5, "it should be more than 5 characters"),
    email :z.string().nonempty('email is required').email("invalid email address"),
    password : z.string().nonempty("password is requird").min(5, "it should be more than 10"),
    confirmPassword : z.string().nonempty("confirm password is required")
    // csrf_token : z.string().nonempty("csrf token is required")
  })

export function Signup() {
  const navigate = useNavigate();
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [ checkPassword, setCheckPassword ] = useState(false)
  // const [ token, setToken ] = useState("")
  const {
    register,
    // setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(productSchema)
  });

console.log(errors);

  // useEffect(() => {
  //       const checkToken = async () => {
  //         try {
  //           const res = await axios.get("https://zoom-backend-l0uq.onrender.com/api/generateCsrf.php", {
  //             withCredentials: true
  //           })
  //           setToken(res.data.csrf_token);
  //           console.log(res.data.csrf_token);
            
            
  //         }catch (err) {
  //           console.log(err);
  //         }
  //       }
  //       checkToken()
  // }, [])

  // useEffect(() => {
  //   if (token) {
  //     setValue("csrf_token", token);
  //   }
  // }, [token, setValue]);
  

  async function onSubmit(data){

      
      let check = data.password
      let confirmCheck = data.confirmPassword
      if (check !== confirmCheck){
          setCheckPassword(true)
          setTimeout(() => {
            setCheckPassword(false)
          }, 3000);
          return;
      }
      


      try {
        let res = await axios.post(
          "https://zoom-backend-l0uq.onrender.com/api/signup.php",
          data,
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        if(res.data.status == 'success'){
             
          toast.success("Account created successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000)
        }else{
            console.log("RESPONSE FROM PHP:", res.data);
            toast.error(res.data.message || "Signup failed. Please try again.");
        }
      } catch (err) {
        console.log("Error:", err);
      }
  }




    return(
        <>
            <PublicNav />
          <div className="h-[100vh] bg-gradient-to-b from-[#0B1215] to-[#111C22] w-full flex justify-center  items-center ">
              <form onSubmit={handleSubmit(onSubmit)} className="
                w-full
                max-w-xl
                bg-[#111C22]/90
                backdrop-blur-xl
                border
                border-[#22313A]
                rounded-3xl
                p-8
                md:p-10
                shadow-2xl
                shadow-black/30
                flex
                flex-col
                gap-4
                mt-20
              ">
                <div className="text-center flex flex-col gap-2">

              <div className="
                w-14 h-14
                mx-auto
                rounded-2xl
                bg-gradient-to-br
                from-[#39F3E2]
                to-[#2ED3C4]
                flex
                items-center
                justify-center
                text-[#0B1215]
                text-3xl
                shadow-lg
                shadow-[#39F3E2]/20
              ">
                <i className="bi bi-stars"></i>
              </div>

              <div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                  Join Zoom
                </h1>

                <p className="text-[#94A3B8] mt-2">
                  Create your account and start writing.
                </p>
              </div>

            </div>
                    {/* <h1 className="text-center ">Sign up</h1> */}
                   <div className="flex flex-col gap-2">
                    {/* <input 
                     {...register("csrf_token")}
                     id="csrf_token"
                     type="hidden" 
                     name="csrf_token" 
                    //  value={token}
                     /> */}
                       <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="username">Enter Your Username </label>
                    <input
                      {...register("username")}
                      // onChange={(e) =>{setUsername(e.target.value)}}
                      id="username"
                      name="username"
                      autoComplete="username"
                      // value={username}  
                      className="
                          bg-[#0B1215]
                          border
                          border-[#22313A]
                          rounded-2xl
                          px-4
                          py-3
                          text-white
                          placeholder:text-[#64748B]
                          outline-none
                          transition
                          focus:border-[#39F3E2]
                          focus:ring-4
                          focus:ring-[#39F3E2]/10
                        "
                     type="text" 
                    />
                    <p className="text-red-500">{errors.username?.message}</p>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="email">Enter Your Email</label>
                    <input
                      {...register("email")}
                     id="email"
                     name="email"
                     autoComplete="email"
                    //  onChange={(e) => setEmail(e.target.value)} 
                    //  value={email} 
                     className="
  bg-[#0B1215]
  border
  border-[#22313A]
  rounded-2xl
  px-4
  py-3
  text-white
  placeholder:text-[#64748B]
  outline-none
  transition
  focus:border-[#39F3E2]
  focus:ring-4
  focus:ring-[#39F3E2]/10
"
                     type="email" 
                    />
                     <p className="text-red-400 text-sm font-medium">{errors.email?.message}</p>
                   </div>
                   <div className="flex flex-col gap-2">
                     <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="password">Enter Your Password</label>
                    <input 
                      // {...register("password", { maxLength: { value: 10, message: "it should be more than 10"} , required: { value :true, message: "password is requird"} })}
                      {...register("password")}
                     id="password"
                     name="password"
                     autoComplete="new-password"
                    //  onChange={(e) => setPassword(e.target.value)} 
                    //  value={password} 
                     className="
                          bg-[#0B1215]
                          border
                          border-[#22313A]
                          rounded-2xl
                          px-4
                          py-3
                          text-white
                          placeholder:text-[#64748B]
                          outline-none
                          transition
                          focus:border-[#39F3E2]
                          focus:ring-4
                          focus:ring-[#39F3E2]/10
                        "
                     type="password" 
                    />
                   <p className="text-red-400 text-sm font-medium">{errors.password?.message}</p>
                   </div>
                     <div className="flex flex-col gap-2">
                     <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                      {...register("confirmPassword")}
                     id="confirmPassword"
                     name="confirmPassword"
                     autoComplete="new-password"
                    //  onChange={(e) => setConfirmPassword(e.target.value)} 
                    //  value={confirmPassword} 
                     className="
                          bg-[#0B1215]
                          border
                          border-[#22313A]
                          rounded-2xl
                          px-4
                          py-3
                          text-white
                          placeholder:text-[#64748B]
                          outline-none
                          transition
                          focus:border-[#39F3E2]
                          focus:ring-4
                          focus:ring-[#39F3E2]/10
                        "
                     type="password" 
                    />
                    <p className="text-red-400 text-sm font-medium">{errors.confirmPassword?.message}</p>
                   </div>
                   {checkPassword && <p className="text-red-400 text-sm font-medium">Password does not match</p>}
                  <div className="flex flex-col gap-5">
                      <button type="submit" className="
  w-full
  py-3
  rounded-2xl
  bg-[#39F3E2]
  hover:bg-[#2ED3C4]
  text-[#0B1215]
  font-bold
  transition-all
  duration-300
  shadow-lg
  shadow-[#39F3E2]/20
">Sign Up</button>
                      <p className="text-center text-[#94A3B8] text-sm">Alredy have an account? <Link to="/login" className="text-[#39f3e2] cursor-pointer hover:border-b-1">Click here to Login</Link></p>
                  </div>

              </form>
            </div>
        </>
    )
}