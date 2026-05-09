import { useEffect, useState } from "react"
import { PublicNav } from "../compoents/publicNav"
import { Link } from "react-router-dom"
import axios from "axios"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

 const productSchema = z.object({
    username : z.string().nonempty("title is required").min(5, "it should be more than 5 characters"),
    email :z.string().nonempty('email is required').email("invalid email address"),
    password : z.string().nonempty("password is requird").min(5, "it should be more than 10"),
    confirmPassword : z.string().nonempty("confirm password is required"),
    csrf_token : z.string().nonempty("csrf token is required")
  })

export function Signup() {
  // const { register, handleSubmit, formState: { errors } } = useForm();
  const [ checkPassword, setCheckPassword ] = useState(false)
  const [ token, setToken ] = useState("")
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(productSchema)
  });

console.log(errors);

  useEffect(() => {
        const checkToken = async () => {
          try {
            const res = await axios.get("http://localhost/ZOOM_BACKEND/src/api/generateCsrf.php", {
              withCredentials: true
            })
            setToken(res.data.csrf_token);
            console.log(res.data.csrf_token);
            
            
          }catch (err) {
            console.log(err);
          }
        }
        checkToken()
  }, [])

  useEffect(() => {
    if (token) {
      setValue("csrf_token", token);
    }
  }, [token, setValue]);
  

  async function onSubmit(data){


    console.log(data);

      
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
          "http://localhost/ZOOM_BACKEND/src/api/signup.php",
          data,
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        if(res.status == 'success'){
             
          console.log("RESPONSE FROM PHP:", res);
        }else{
            console.log("RESPONSE FROM PHP:", res.data);
        }
      } catch (err) {
        console.log("Error:", err);
      }
  }




    return(
        <>
            <PublicNav />
          <div className="h-[100vh] bg-[#151922] w-full flex justify-center  items-center flex-col gap-5">
            <h1 className="text-center text-4xl  font-bold text-[#2db4a8]">Join Zoom</h1>
              <form onSubmit={handleSubmit(onSubmit)} className=" bg-[#102121] text-white p-10 rounded flex flex-col gap-5 lg:w-[40%] md:w-[60%] w-[90%]">
                    <h1 className="text-center ">Sign up</h1>
                   <div className="flex flex-col gap-2">
                    <input 
                     {...register("csrf_token")}
                     id="csrf_token"
                     type="hidden" 
                     name="csrf_token" 
                    //  value={token}
                     />
                       <label htmlFor="username">Enter Your Username </label>
                    <input
                      {...register("username")}
                      // onChange={(e) =>{setUsername(e.target.value)}}
                      id="username"
                      name="username"
                      autoComplete="username"
                      // value={username}  
                      className="bg-black p-2 rounded focus:border-[#39f3e2] focus:border outline-none" 
                     type="text" 
                    />
                    <p className="text-red-500">{errors.username?.message}</p>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <label htmlFor="email">Enter Your Email</label>
                    <input
                      {...register("email")}
                     id="email"
                     name="email"
                     autoComplete="email"
                    //  onChange={(e) => setEmail(e.target.value)} 
                    //  value={email} 
                     className="bg-black p-2 rounded outline-none focus:border  focus:border-[#39f3e2]"
                     type="email" 
                    />
                     <p className="text-red-500">{errors.email?.message}</p>
                   </div>
                   <div className="flex flex-col gap-2">
                     <label htmlFor="password">Enter Your Password</label>
                    <input 
                      // {...register("password", { maxLength: { value: 10, message: "it should be more than 10"} , required: { value :true, message: "password is requird"} })}
                      {...register("password")}
                     id="password"
                     name="password"
                     autoComplete="new-password"
                    //  onChange={(e) => setPassword(e.target.value)} 
                    //  value={password} 
                     className="bg-black p-2 rounded outline-none focus:border  focus:border-[#39f3e2]"
                     type="password" 
                    />
                   <p className="text-red-500">{errors.password?.message}</p>
                   </div>
                     <div className="flex flex-col gap-2">
                     <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                      {...register("confirmPassword")}
                     id="confirmPassword"
                     name="confirmPassword"
                     autoComplete="new-password"
                    //  onChange={(e) => setConfirmPassword(e.target.value)} 
                    //  value={confirmPassword} 
                     className="bg-black p-2 rounded outline-none focus:border  focus:border-[#39f3e2]"
                     type="password" 
                    />
                    <p className="text-red-500">{errors.confirmPassword?.message}</p>
                   </div>
                   {checkPassword && <p>Password does not match</p>}
                  <div className="flex flex-col gap-5">
                      <button type="submit" className="bg-[#39f3e2]/60 px-5 py-2 font-bold rounded text-[#102121] mp-5">Sign Up</button>
                      <p className="text-center">Alredy have an account? <Link to="/login" className="text-[#39f3e2] cursor-pointer hover:border-b-1">Click here to Login</Link></p>
                  </div>

              </form>
            </div>
        </>
    )
}