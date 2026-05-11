import { PublicNav } from "../compoents/publicNav"
import { PublicBody } from "../compoents/pubicBody"
import  { isLoggedIn }  from "../compoents/auth"
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export function Home(){
    const auth = isLoggedIn();
    const token = localStorage.getItem("token")
    const { user, setUser } = useContext(UserContext);
    localStorage.setItem("user", JSON.stringify(user));
    
    useEffect(() => {
                const  getUserInfo = async () => {
                    try{
                         let res =  await axios.get(
                        "https://zoom-backend-l0uq.onrender.com/api/getUser.php",
                        {
                            headers: { "Authorization": `Bearer ${token}` },
                            withCredentials: true
                        }
                    );
                    setUser({
                        username: res.data.data.username,
                        email: res.data.data.email,
                        profile: res.data.data.profile_picture || null,
                        role: res.data.data.role
                    })
                    }catch(err){
                        console.log(err);
                        
                    }
                }
                if(token) getUserInfo()
            }, [token, setUser])

        return(
            <>
              <PublicNav auth={auth} user={user} />
              <PublicBody />
            </>
        )
    }

    
