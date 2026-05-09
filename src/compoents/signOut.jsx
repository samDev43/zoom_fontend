


// import { useNavigate } from "react-router-dom";


export const useLogout = (navigate) => {
    // const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };
    return logout;
};
