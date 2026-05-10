import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import { ca } from "zod/locales";
// import { useContext } from "react";
// import { UserContext } from "../UserContext";
export function AdminRoute({ children }) {
    const [ userRole, setUserRole] = useState(null);
    const [ loading, setLoading] = useState(false);  
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const gotUserInfo = async () => {
            try{
                const res = await axios.get("https://myzoomapi.great-site.net/zoom_backend-main/src/api/getUser.php", {
                    headers: { "Authorization": `Bearer ${token}` },
                    withCredentials: true
                });                
                setUserRole(res.data.data.role);
                setLoading(true)
            }catch(err){
                console.log(err);
            }
        }
        gotUserInfo()
    }, [])
    const token = localStorage.getItem("token");
    if(!loading){
        return <div>Loading...</div>;
    }
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}