import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

const VerifyToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />; // Redireciona para login se não houver token
    } else {
        return <Outlet/>
    }
};

export default VerifyToken;
