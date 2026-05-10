import {  PublicNav } from "../compoents/publicNav"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const productSchema = z.object({
    username_email : z.string().nonempty("username/email is required"),
    password : z.string().nonempty("password is requird").min(2, "it should be more than 10"),
})


export function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm({resolver: zodResolver(productSchema)});
    const navigate = useNavigate();
    console.log(errors);

    useEffect(()=> {
        const checkLogin = async () => {
            try {
                const res = await axios.get("https://myzoomapi.great-site.net/zoom_backend-main/src/api/checkLogin.php", {
                    withCredentials: true
                })
                console.log(res.data);
            }catch (err) {
                console.log(err);
            }
        }
        checkLogin()
    },[])
    
    const onSubmit = async (data) => {
        console.log(data);
        try {
             let res = await axios.post(
            "https://myzoomapi.great-site.net/zoom_backend-main/src/api/login.php",
            data,
            {
                 headers: { "Content-Type": "application/json" },
                  withCredentials: true
             }
        )
        console.log('responce from php', res.data.message);
        if(res.data.status === "success") {
            console.log(res.data.token);
            
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("isLoggedIn", "true")
            navigate("/");
            
        }  
       }catch (err) {
             console.log(err);
        }
    }

    return(
        <>
            <PublicNav />
           <div className="h-[100vh] bg-[#151922] w-full flex justify-center  items-center flex-col gap-5">
            <h1 className="text-center text-4xl text-white font-bold">Welcome back</h1>
              <form onSubmit={handleSubmit(onSubmit)} className=" bg-[#0f1a1d] text-white p-10 rounded flex flex-col gap-5 lg:w-[35%] md:w-[60%] w-[90%]">
                    <h1 className="text-center ">Login</h1>
                   <div className="flex flex-col gap-2">
                       <label htmlFor="username/email">Enter Your Username Email</label>
                    <input
                    {...register("username_email")}
                      className="bg-black p-2 rounded focus:border-[#39f3e2] focus:border outline-none" 
                      type="text" 
                      name="username_email"
                    id="username/email"
                    autoComplete="username/email"
                    />
                    <p  className="text-red-500">{errors.username_email?.message}</p>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <label htmlFor="password">Enter Your Password</label>
                    <input 
                        {...register("password")}
                      className="bg-black p-2 rounded outline-none focus:border  focus:border-[#39f3e2]"
                      type="password"  
                      name="password"
                      id="password"
                      autoComplete="current-password"
                    />
                    <p className="text-red-500">{errors.password?.message}</p>
                   </div>
                  <div className="flex flex-col gap-5">
                      <button className="bg-[#39f3e2] px-5 py-2 font-bold rounded text-[#102121] mp-5">Login</button>
                      <p className="text-center">New here? <Link to="/Signup" className="text-[#39f3e2] cursor-pointer hover:border-b-1">Click here to Create Account</Link></p>
                  </div>

              </form>
            </div>
        </>
    )
}