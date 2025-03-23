import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Sidebar from "../../Components/Sidebar";

function Essay() {
    const id = 'planilhas';
    const [subj, setSubj] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [themes, setthemes] = useState([]);
    const [master, setMaster] = useState('');
    const token = localStorage.getItem('token');
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar
    
    function OpenSidebar() {
        setlargura(200);
    }
    
    function CloseSidebar() {
        setlargura(0);
    }

    async function Sends(e) {
        try {
            const title = document.getElementById('theme-title').value;
            const texts = document.getElementById('theme-text').value;

            const response = await axios.post(
                'https://ladies-of-wisdom-production.up.railway.app/themes/add', 
                { title, texts },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(response.data);
        } catch (error) {
            console.error("Erro ao enviar a tarefa:", error);
        }
    }   

    async function OpenPopUp() {
        document.getElementById('popup-add-task').style.display = 'flex'
    }

    async function ClosePopUp() {
        document.getElementById('popup-add-task').style.display = 'none'
    }

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/subj/subject');
                const subjects = response.data;
                setSubj(subjects.filter((subj) => String(subj.id) === id));
            } catch (err) {
                console.error("Erro ao buscar a matéria:", err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        }
        async function fetchThemes() {
            try {
                const response = await axios.get(`https://ladies-of-wisdom-production.up.railway.app/themes`);
                setthemes(response.data);
            } catch (error) {
                console.error("Erro ao pegar as themes:", error);
            }
        }
        async function isMaster() {
            const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/users/master', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            })
            setMaster(response.data.master);
        }
        fetchSubjects();
        fetchThemes();
        isMaster();
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
                <div>
                    <h1>Redação</h1>
                </div>

                {master &&
                    <div className="add-task" onClick={OpenPopUp}>
                        <h1>+</h1>
                    </div>
                }

                {Array.isArray(themes) && themes.map((theme) => 
                    <div className="task" key={theme._id}>
                        <h2>{theme.title}</h2>
                        <div style={{flexWrap: 'wrap'}}>
                            
                        </div>
                                        
                    </div>
                )}
            </div>

            <div id="popup-add-task" style={{display: 'none'}}>
                <form onSubmit={Sends}>
                    <IoClose style={{float: 'right'}} size={25} onClick={ClosePopUp}/>
                    <label htmlFor="theme-title">Insira o título do post:</label>
                    <br/>
                    <label>Tema: </label>
                    <input id="theme-title"/>
                    <br/>
                    <label>Textos de apoio:</label>
                    <input type="text" id="theme-text"/>

                    <button type="submit">ENVIAR</button>
                </form>
            </div>
        </div>
    );
}

export default Essay;