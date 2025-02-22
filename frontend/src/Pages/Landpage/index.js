import React from "react";
import { Link } from "react-router-dom";
import './index.css'

function Landpage() {
    
    return(
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <Link id="entrar" to={'/login'}>Entrar</Link>
            </header>
            <div id="div1">
                <div>
                    <h1>Já faz parte da comunidade?</h1>
                    <button><a>Entenda a plataforma</a></button>
                </div>

                <div>
                    <h1>Ainda não faz parte?</h1>
                    <button><a>Conheça o projeto</a></button>
                </div>
            </div>
        </div>
    )
}

export default Landpage;