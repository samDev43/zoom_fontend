import axios from "axios";
// import { useState } from "react";

export async function upLoadImage(e)  {
    const file = e.target.files[0];
    if(!file){
        alert("Please select an image file.");
        return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");
    try{
        const res = await axios.post("https://myzoomapi.great-site.net/api/uploadProfile.php", formData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    console.log(res.data);
    }catch(err){
        console.log(err);
    }
    
} 

