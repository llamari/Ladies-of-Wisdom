import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import './index.css'

function Subject() {
    const { id } = useParams();  // Pegando o ID correto da URL
    const [subj, setSubj] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [master, setMaster] = useState('');
    const token = localStorage.getItem('token');

    async function Sends(e) {     
        try {
            const title = document.getElementById('task-title').value;
            const name = [document.getElementById('task-name').value]; // Envia como array
            const link = [document.getElementById('task-link').value]; // Envia como array
    
            const response = await axios.post(
                'https://ladies-of-wisdom-production.up.railway.app/task/add', 
                { title, name, link, id }, // Enviando um objeto JSON válido
                { headers: { "Content-Type": "application/json" } } // Definindo o cabeçalho correto
            );
    
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao enviar a tarefa:", error);
        }
    }

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/subj/subject');
                const subjects = response.data;
                setSubj(subjects.filter((subj) => String(subj.id) === id)); // Comparação segura
            } catch (err) {
                console.error("Erro ao buscar a matéria:", err);
                setError("Erro ao carregar os dados.");
            } finally {
                setLoading(false);
            }
        }
        async function fetchTasks() {
            try {
                const response = await axios.get(`https://ladies-of-wisdom-production.up.railway.app/task/${id}`);
                setTasks(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Erro ao pegar as tasks:", error);
            }
        }
        async function isMaster() {
            console.log(token)
            const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/users/master', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            })
            setMaster(response.data);
            console.log(response.data);
        }
        fetchSubjects();
        fetchTasks();
        isMaster();
    }, [id]);  // Roda sempre que o ID mudar

    return (
        <div>
            <header id="header">
                <Link to={'/home'}><img src="/assets/LW.png" alt="Logo" /></Link>
                <FaRegUserCircle className="icon-user" color="white" size={60} />
            </header>
            <div className="background-subject">
                <div>
                    {loading ? (
                        <p>Carregando matéria...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : subj.length > 0 ? (
                        subj.map((mat) => (
                            <div key={mat.id}>
                                <h1>{mat.name}</h1>
                            </div>
                        ))
                    ) : (
                        <p>Matéria não encontrada.</p>
                    )}
                </div>

                {master == true ?
                    <div>
                        <form>
                            <input type="text" id="task-title"/>
                            <input type="text" id="task-name"/>
                            <input type="file" id="task-link"/>
                            <button onClick={Sends}>ENVIAR</button>
                        </form>
                    </div>
                    :
                    <div/>
                }
                

                {tasks.map((task) => 
                    <div className="task">
                        <h2>{task.title}</h2>
                        <a href={task.documents[0].link}>{task.documents[0].title}</a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Subject;
