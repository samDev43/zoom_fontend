import {  PublicNav } from "../compoents/publicNav"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const productSchema = z.object({
    username_email : z.string().nonempty("username/email is required"),
    password : z.string().nonempty("password is requird").min(2, "it should be more than 10"),
})


export function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(productSchema)});
    const navigate = useNavigate();
    console.log(errors);

    // useEffect(()=> {
    //     const checkLogin = async () => {
    //         try {
    //             const res = await axios.get("https://zoom-backend-l0uq.onrender.com/api/checkLogin.php", {
    //                 withCredentials: true
    //             })
    //             console.log(res.data);
    //         }catch (err) {
    //             console.log(err);
    //         }
    //     }
    //     checkLogin()
    // },[])
    
    const onSubmit = async (data) => {
        console.log(data);
        try {
             let res = await axios.post(
            "https://zoom-backend-l0uq.onrender.com/api/login.php",
            data,
            {
                 headers: { "Content-Type": "application/json" },
                  withCredentials: true
             }
        )
        console.log('responce from php', res.data);
        if(res.data.status === "success") {
            // console.log(res.data.token);
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLoggedIn", "true")
            toast.success("Login successful!");
            setTimeout(() => {
                navigate("/");
            }, 2000)
            
        }  else{
            toast.error(res.data.message || "Login failed. Please try again.");
        }
       }catch (err) {
             console.log(err);
        }
    }

    return(
        <>
            <PublicNav />
           <div className="h-[100vh] bg-gradient-to-b from-[#0B1215] to-[#111C22] w-full flex justify-center  items-center flex-col gap-5">
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
  ">
  <h1 className="text-center text-4xl font-black text-white tracking-tight">Welcome back</h1>
                    <h1 className="text-center text-2xl font-black text-white ">Login</h1>
                   <div className="flex flex-col gap-2">
                       <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="username/email">Enter Your Username Email</label>
                    <input
                    {...register("username_email")}
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
                      name="username_email"
                    id="username/email"
                    autoComplete="username/email"
                    />
                    <p  className="text-red-400 text-sm font-medium">{errors.username_email?.message}</p>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <label className="text-[#E2E8F0] font-medium text-sm" htmlFor="password">Enter Your Password</label>
                    <input 
                        {...register("password")}
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
                      name="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <p className="text-red-400 text-sm font-medium">{errors.password?.message}</p>
                   </div>
                  <div className="flex flex-col gap-5">
                      <button className="
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
">Login</button>
                      <p className="text-center text-[#94A3B8] text-sm">New here? <Link to="/Signup" className="text-[#39f3e2] cursor-pointer hover:border-b-1">Click here to Create Account</Link></p>
                  </div>

              </form>
            </div>
        </>
    )
}