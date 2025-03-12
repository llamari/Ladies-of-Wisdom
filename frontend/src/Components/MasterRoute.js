// src/components/MasterRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correto

const MasterRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" />; // Redireciona para login se não houver token
    }

    try {
        const decoded = jwtDecode(token); // Decodifica o token
        if (decoded.master) {
            return <Outlet />; // Permite acesso à rota protegida
        } else {
            return <Navigate to="/home" />; // Se não for master, redireciona para home
        }
    } catch (error) {
        console.error("Token inválido:", error);
        return <Navigate to="/login" />;
    }
};

export default MasterRoute;
