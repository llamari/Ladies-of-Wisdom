import React, { useEffect, useState } from "react";
import { FaRegUserCircle,FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import './index.css';

function Users() {
    const [users, setUsers] = useState([]);

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
    }, [])

    return(
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <FaRegUserCircle className="icon-user" color="white" size={60}/>
            </header>

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