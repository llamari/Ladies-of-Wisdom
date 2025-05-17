import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle, FaArrowRight} from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import './index.css';

function Corrected_essay() {
    const { tema } = useParams();
    const token = localStorage.getItem('token');
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar
    const [essay, setEssay] = useState();
    const [theme, setTheme] = useState();
    
    function OpenSidebar() {
        setlargura(200);
    }
    
    function CloseSidebar() {
        setlargura(0);
    }
    
    useEffect(() => {
        async function GetEssay() {
            const base64Payload = token.split('.')[1]; // Pega o payload
            const payload = JSON.parse(atob(base64Payload)); // Decodifica de base64
            const user =  payload.id || payload._id; 
            const response = await axios.get(`https://ladies-of-wisdom.onrender.com/essay/${user}/${tema}`);
            console.log(response.data);
            setEssay(response.data[0]);
        }
        async function GetTheme() {
            //chama o tema do backend pelo id da url
            const response = await axios.get(`https://ladies-of-wisdom-production.up.railway.app/themes/get/${tema}`);
            console.log(response.data);
            setTheme(response.data);
        }
        GetTheme();
        GetEssay();
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
                <Link to={'/home'}><img src="/assets/LW.png" alt="Logo"/></Link>
                <FaRegUserCircle className="icon-user" color="white" size={60} onClick={OpenSidebar} style={{cursor: 'pointer'}}/>
            </header>
            <Sidebar largura={largura} sidebarRef={sidebarRef}/>

            <div className="background-subject">
                {theme && <h1>{theme.title}</h1>}
                <div id="display-essay">
                    <div id="original-theme">
                    {essay ? 
                        <div>
                            <h2>Texto: </h2>
                            <p>{essay.essay}</p>
                        </div> 
                        : 
                        "Carregando..."
                    }

                    </div>
                    <div id="writing-my-essay">
                        {essay && essay.correction !=null ?
                            <div className="essay_correction">
                                <h2>Correção:</h2> 
                                {essay.correction}
                            </div>
                            :
                            <div className="essay_correction">
                                <h2>Correção indisponível</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Corrected_essay;