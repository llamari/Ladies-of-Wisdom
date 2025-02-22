import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import './index.css'

function Home() {
    
    return(
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <FaRegUserCircle className="icon-user" color="white" size={60}/>
            </header>

            <h1>Login bem sucedido!</h1>
        </div>
    )
}

export default Home