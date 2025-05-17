import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle, FaArrowRight} from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import './index.css';

function EssayCorrecting() {
    const { user, tema } = useParams();
    const token = localStorage.getItem('token');
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar
    const [essay, setEssay] = useState();
    const [theme, setTheme] = useState();
    const [correction, setcorrection] = useState("");
    const [grade, setGrade] = useState();
    
    function OpenSidebar() {
        setlargura(200);
    }
    
    function CloseSidebar() {
        setlargura(0);
    }

    async function SendCorrection() {
        if (!correction.trim()) {
            alert("A correção não pode estar vazia!");
            return;
        }
        try {
            const response = await axios.post('https://ladies-of-wisdom.onrender.com/essay/correct', {
                user: user,
                tema: tema,
                correcao: correction,
                grade: grade,
            });
            alert("Correção enviada com sucesso!");
            window.location.href = '/home';
        } catch (error) {
            console.error("Erro ao enviar a redação:", error);
            alert("Ocorreu um erro ao enviar a redação.");
        }
    }
    
    useEffect(() => {
        async function GetEssay() {
            const response = await axios.get(`https://ladies-of-wisdom.onrender.com/essay/${user}/${tema}`);
            console.log(response.data);
            setEssay(response.data[0]);
        }
        async function GetTheme() {
            //chama o tema do backend pelo id da url
            const response = await axios.get(`https://ladies-of-wisdom.onrender.com/themes/get/${tema}`);
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
                    
                    {essay && essay.correction ?
                        <div id="writing-my-essay">
                            <h3 style={{color: 'black'}}>Nota: </h3>
                            <p style={{width: '100%', backgroundColor: '#CBCBCB', color: 'black', borderRadius: '1rem', padding: '.5rem'}}> 
                                {essay.grade}
                            </p>
                            <h3 style={{color: 'black'}}>Correção:</h3>
                            <p style={{width: '100%', backgroundColor: '#CBCBCB', color: 'black', borderRadius: '1rem', padding: '.5rem'}}>
                                {essay.correction}
                            </p>
                        </div>
                        :

                        <div id="writing-my-essay">
                            <h3>Nota: </h3>
                            <input 
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            />
                            <h3>Correção:</h3>
                            <textarea 
                                id="my-essay"
                                value={correction} 
                                onChange={(e) => setcorrection(e.target.value)}
                            />
                        </div>
                    }
                </div>
                {essay && essay.correction == null &&
                    <button id="send-button" onClick={SendCorrection}>
                        <FaArrowRight />
                    </button>
                }
            </div>
        </div>
    );
}

export default EssayCorrecting;