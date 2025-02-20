import React from "react";
import './index.css'

function Landpage() {
    
    return(
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <a id="entrar">Entrar</a>
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