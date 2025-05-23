import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './index.css';

function Sidebar({largura, sidebarRef}){
    const [user, setuser] = useState('');
    const token = localStorage.getItem('token');

    function LogOut() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    useEffect(()=>{
        async function GetUser() {
            const response = await axios.get('https://ladies-of-wisdom.onrender.com/users/master', {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            })
            setuser(response.data);
        }
        GetUser();
    }, [])
    

    return(
        <aside
            ref={sidebarRef} // Adiciona a referência
            id="barra-lateral"
            style={{
                width: largura,
                height: "100%",
                backgroundColor: "#ca4670",
                position: "fixed",
                top: 0,
                left: 0,
                transition: "0.6s",
                overflowX: "hidden",
                color: "white",
                zIndex: 10,
            }}
        >
            <h1>Olá {user.name}!</h1>

            {user.master && 
                <div className="manage-users">
                    <Link to={'/users'}>
                        Gerenciar usuárias
                    </Link>
                </div>
            }

            <div className="manage-users" onClick={LogOut} style={{position: 'absolute', bottom: '1rem'}}>
                Sair
            </div>
        </aside>   
    )
}

export default Sidebar;