import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle, FaArrowRight} from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import './index.css';

function EssayWriting() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar
    const [theme, setTheme] = useState();
    const [essayText, setEssayText] = useState("");
    
    function OpenSidebar() {
        setlargura(200);
    }
    
    function CloseSidebar() {
        setlargura(0);
    }

    async function SendEssay() {
        if (!essayText.trim()) {
            alert("A redação não pode estar vazia!");
            return;
        }

        try {
            const response = await axios.post('https://ladies-of-wisdom.onrender.com/essay/add', {
                text: essayText,
                token: token,
                theme: id
            });
            alert("Redação enviada com sucesso!");
            window.location.href = '/home';
        } catch (error) {
            console.error("Erro ao enviar a redação:", error);
            alert("Ocorreu um erro ao enviar a redação.");
        }
    }
    
    useEffect(() => {
        async function GetTheme(id) {
            //chama o tema do backend pelo id da url
            const response = await axios.get(`https://ladies-of-wisdom.onrender.com/themes/get/${id}`);
            console.log(response.data);
            setTheme(response.data);
        }
        GetTheme(id);
    }, [id]); 

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
                <div style={{display: 'flex'}}>
                    <div id="original-theme">
                    {theme ? 
                        <div>
                            <h2>{theme.title}</h2>
                            <p>{theme.texts}</p>
                        </div> 
                        : 
                        "Carregando..."
                    }

                    </div>
                    <div id="writing-my-essay">
                        <h2>Escreva sua redação aqui: </h2>
                        <textarea 
                            id="my-essay"
                            value={essayText} 
                            onChange={(e) => setEssayText(e.target.value)}
                        />
                    </div>
                </div>
                <button id="send-button" onClick={SendEssay}>
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
}

export default EssayWriting;