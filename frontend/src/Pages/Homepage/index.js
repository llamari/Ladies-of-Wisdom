import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import "./index.css";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

function Home() {
    const [subj, setSubj] = useState([]);
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar

    function OpenSidebar() {
        setlargura(200);
    }

    function CloseSidebar() {
        setlargura(0);
    }

    async function materias() {
        const response = await axios.get("https://ladies-of-wisdom-production.up.railway.app/subj/subject");
        setSubj(response.data);
    }

    useEffect(() => {
        materias();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                CloseSidebar(); // Fecha a sidebar se o clique for fora dela
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <FaRegUserCircle className="icon-user" color="white" size={60} onClick={OpenSidebar} style={{cursor: "pointer"}}/>
            </header>

            <Sidebar largura={largura} sidebarRef={sidebarRef}/>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                    <Link
                        to={`/planilhas`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(242, 154, 207, 0.4), rgba(242, 154, 207, 0.4))`,
                        }}
                        className="card-materia"
                    >
                        <h1 className="card-title">Planilhas</h1>
                    </Link>   
                    
                                 
                    {subj.map((materia) => (
                    <Link
                        to={`/subject/${materia.id}`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(242, 154, 207, 0.4), rgba(242, 154, 207, 0.4)), url(${materia.image})`,
                        }}
                        key={materia.id}
                        className="card-materia"
                    >
                        <h1 className="card-title">{materia.name}</h1>
                    </Link>
                ))}

            </div>
        </div>
    );
}

export default Home;
