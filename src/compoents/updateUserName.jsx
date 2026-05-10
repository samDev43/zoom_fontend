import axios from "axios"
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../UserContext";

// const { user } = useContext(UserContext);

export async function updateUserName(newUserName){
    
    const token = localStorage.getItem("token");

    try{
       const res = await axios.post("https://myzoomapi.great-site.net/api/updateUserName.php", { username: newUserName }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(res.data);
    }catch(err){
        console.log(err);
    }
}

export async function updateEmail(newEmail){
    const token = localStorage.getItem("token");

    try{
       const res = await axios.post("https://myzoomapi.great-site.net/api/updateEmail.php", { email: newEmail }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(res.data);
    }catch(err){
        console.log(err);
    }
}

export async function updatePassword(newPassword){
    let token = localStorage.getItem("token");
    
    try{
       const res = await axios.post("https://myzoomapi.great-site.net/api/updatePassword.php", { password: newPassword }, {
        headers: { "Authorization": `Bearer ${token}` },
    });
    console.log(res.data);
    }catch(err){
        console.log(err);
    }
}

export async function deleteAccount(AccountId, role, setUsers){
    const token = localStorage.getItem("token");

    
    try{
        const res = await axios.post("https://myzoomapi.great-site.net/api/deleteAccount.php", {id: AccountId}, {
            headers: { "Authorization": `Bearer ${token}` },   
        });
        console.log(res.data);
        if(res.data.status === "success"){
            if(role === "admin"){
                window.location.href = "/";
            }else{
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setUsers(prevUsers => prevUsers.filter(user => user.id !== AccountId));
        }
    }catch(err){
        console.log(err);
    }

}