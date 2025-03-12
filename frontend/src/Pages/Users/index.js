import React, { useEffect, useState, useRef } from "react";
import { FaRegUserCircle,FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../Components/Sidebar";
import './index.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [largura, setlargura] = useState(0);
    const sidebarRef = useRef(null); // Cria uma referência para a sidebar

    function OpenSidebar() {
        setlargura(200);
    }

    function CloseSidebar() {
        setlargura(0);
    }

    async function AddUser(e) {
        try {
            const nome = document.getElementById('new-user-name').value;
            const email = document.getElementById('new-user-email').value;
            const response = await axios.post('https://ladies-of-wisdom-production.up.railway.app/users/signup', {
                email, nome
            })

            console.log(response.data)
            GetUsers()
        } catch (error) {
            console.error('Erro ao criar usuária: ', error);
        }
    }

    async function DeleteUser(email) {
        try {
            const response = await axios.post('https://ladies-of-wisdom-production.up.railway.app/users/delete', {email});
            GetUsers()
        } catch (error) {
            console.error('Erro ao deletar: ', error)
        }
    }

    async function GetUsers() {
        try {
            const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/users/getall');
            setUsers(response.data);
        } catch (error) {
            console.error('Erro ao pegar usuários: ', error);
        }
    }

    useEffect(() => {
        GetUsers()
        
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                CloseSidebar(); // Fecha a sidebar se o clique for fora dela
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return(
        <div>
            <header id="header">
                <Link to={'/home'}><img src="/assets/LW.png" alt="Logo" /></Link>
                <FaRegUserCircle className="icon-user" color="white" size={60} onClick={OpenSidebar}/>
            </header>
                <Sidebar largura={largura} sidebarRef={sidebarRef}/>
        

            <form onSubmit={AddUser} id="add-new-user">
                <h2>Adicionar nova usuária</h2>
                <label htmlFor="new-user-name">Nome: </label> <br/>
                <input id='new-user-name'/><br/>

                <label htmlFor="new-user-email">E-mail: </label><br/>
                <input id='new-user-email' type="email"/><br/><br/>
                <button type='submit'>ADICIONAR USUÁRIA</button>
            </form>

            <div>
                <h2 style={{margin: '3% 0 0 5%', fontWeight: 800, color: '#a83056', fontFamily: 'arial'}}>Usuárias</h2>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <div className="user-card">
                            <h3 key={user._id}>
                                {user.nome} 
                                <FaRegTrashAlt className='user-trash' onClick={() => DeleteUser(user.email)}/>
                            </h3>
                            {user.email}
                        </div>
                    ))
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </div>
        </div>
    )
}

export default Users;