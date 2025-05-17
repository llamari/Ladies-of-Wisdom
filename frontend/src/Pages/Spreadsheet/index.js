import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Sidebar from "../../Components/Sidebar";

function Spreadsheet() {
    const id = 'planilhas';
    const [subj, setSubj] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [master, setMaster] = useState('');
    const [data, setData] = useState([]);
    const [links, setLinks] = useState(0); // Começa com 0 links
    const [arquivo, setArquivos] = useState(0); // Começa com 0 arquivos
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
            const title = document.getElementById('task-title').value;
            const linkName = Array.from(document.getElementsByClassName('link-name')).map(input => input.value); 
            const linkNormal = Array.from(document.getElementsByClassName('link')).map(input => input.value);
            const fileName = Array.from(document.getElementsByClassName('file-name')).map(input => input.value); 
            const fileLink = data;
            console.log('data: ', data);
            const name = linkName.concat(fileName); 
            const link = linkNormal.concat(fileLink);

            const response = await axios.post(
                'https://ladies-of-wisdom.onrender.com/task/add', 
                { title, name, link, id },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log(response.data);
        } catch (error) {
            console.error("Erro ao enviar a tarefa:", error);
        }
    }

    async function handleUpload(e) {
        console.log("Arquivos selecionados:", e.target.files); // Verifica se há arquivos
        const file = e.target.files[0];
    
        if (!file) {
            console.log("Nenhum arquivo selecionado.");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file);
    
        console.log("Enviando arquivo:", file.name);

        const response = await fetch("https://ladies-of-wisdom.onrender.com/task/upload", {
            method: "POST",
            body: formData
        });

        const jsonResponse = await response.json(); 
        setData((prevData) => [...prevData, jsonResponse.url]);
        console.log("Arquivo salvo em:", jsonResponse);
    }    

    async function OpenPopUp() {
        document.getElementById('popup-add-task').style.display = 'flex'
    }

    async function ClosePopUp() {
        document.getElementById('popup-add-task').style.display = 'none'
        setArquivos(0);
        setLinks(0)
    }

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await axios.get('https://ladies-of-wisdom.onrender.com/subj/subject');
                const subjects = response.data;
                setSubj(subjects.filter((subj) => String(subj.id) === id));
            } catch (err) {
                console.error("Erro ao buscar a matéria:", err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        }
        async function fetchTasks() {
            try {
                const response = await axios.get(`https://ladies-of-wisdom.onrender.com/task/${id}`);
                setTasks(response.data);
            } catch (error) {
                console.error("Erro ao pegar as tasks:", error);
            }
        }
        async function isMaster() {
            const response = await axios.get('https://ladies-of-wisdom.onrender.com/users/master', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            })
            setMaster(response.data.master);
        }
        fetchSubjects();
        fetchTasks();
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

    // Atualiza links
    const handleAddLink = () => setLinks(links + 1);
    // Atualiza arquivos
    const handleAddFile = () => setArquivos(arquivo + 1);

    return (
        <div>
            <header id="header">
                <Link to={'/home'}><img src="/assets/LW.png" alt="Logo"/></Link>
                <FaRegUserCircle className="icon-user" color="white" size={60} onClick={OpenSidebar} style={{cursor: 'pointer'}}/>
            </header>
            <Sidebar largura={largura} sidebarRef={sidebarRef}/>

            <div className="background-subject">
                <div>
                    <h1>Planilhas</h1>
                </div>

                {master &&
                    <div className="add-task" onClick={OpenPopUp}>
                        <h1>+</h1>
                    </div>
                }

                {Array.isArray(tasks) && tasks.map((task) => 
                    <div className="task" key={task._id}>
                        <h2>{task.title}</h2>
                        <div style={{flexWrap: 'wrap'}}>
                            {task.documents.map((item) => 
                                <a href={item.link}>{item.title}</a>
                            )}
                        </div>
                                        
                    </div>
                )}
            </div>

            <div id="popup-add-task" style={{display: 'none'}}>
                <form onSubmit={Sends}>
                    <IoClose style={{float: 'right'}} size={25} onClick={ClosePopUp}/>
                    <label htmlFor="task-title">Insira o título do post:</label>
                    <br/>
                    <input id="task-title"/>
                    <br/>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {[...Array(links)].map((_, i) => (
                                <div key={`link-${i}`} className="newInfo">
                                    <label htmlFor={`task-link-title-${i}`}>Título do link:</label>
                                    <input className={`task-name link-name`} name={`task-link-title-${i}`} />
                                    
                                    <label htmlFor={`task-link-${i}`}>Link:</label>
                                    <input className={`task-name link`} id={`task-link-${i}`} />
                                </div>
                            ))}
                            <button type="button" onClick={handleAddLink}>+ LINK</button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
                            {[...Array(arquivo)].map((_, i) => (
                                <div key={`arquivo-${i}`} className="newInfo">
                                    <label htmlFor={`task-file-title-${i}`}>Título do arquivo:</label>
                                    <input className={`task-name file-name`} name={`task-file-title-${i}`} />

                                    <label htmlFor={`task-file-${i}`}>Arquivo:</label>
                                    <input type="file" className={`task-file`} name={`task-file-${i}`} onChange={handleUpload} accept=".xls, .xlsx, .csv"/>
                                </div>
                            ))}
                            <button type="button" onClick={handleAddFile}>+ ARQUIVO</button>
                        </div>
                    </div>

                    <button type="submit">ENVIAR</button>
                </form>
            </div>
        </div>
    );
}

export default Spreadsheet;