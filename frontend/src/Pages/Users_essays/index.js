import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle, FaCheckCircle  } from "react-icons/fa";
import Sidebar from "../../Components/Sidebar";
import './index.css';

function User_essay() {
    const { id } = useParams();
    const [themes, setthemes] = useState([]);
    const token = localStorage.getItem('token');
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar
    const [themeEssays, setthemeEssays] = useState([]);
    
    function OpenSidebar() {
        setlargura(200);
    }
    
    function CloseSidebar() {
        setlargura(0);
    }

    useEffect(() => {
        async function GetThemeEssays() {
            const response = await axios.post('https://ladies-of-wisdom.onrender.com/essay/bytheme', {
                theme: id
            })
            console.log(response.data);
            console.log("O id enviado foi: ", id);
            setthemeEssays(response.data);
        }
        GetThemeEssays();
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
                    <h1>Redações</h1>
                </div>
                    <div>
                        {themeEssays && themeEssays.length>0 ? 
                            themeEssays.map((theme) => (
                                <Link to={`/essay/${theme.writer}/${id}`}>
                                    <div className="task" key={theme._id}>
                                        <h2>
                                            {theme.writer_name}
                                            {theme.correction ? 
                                                <FaCheckCircle color="green" style={{float: 'right'}}/>
                                            :
                                                <FaCheckCircle color="grey" style={{float: 'right'}}/>
                                            }
                                        </h2>
                                    </div>
                                </Link>
                            ))
                        :
                            <h2 style={{color: 'black'}}>Ainda não há redações sobre esse tema</h2>
                        }
                    </div>
            </div>
        </div>
    );
}

export default User_essay;