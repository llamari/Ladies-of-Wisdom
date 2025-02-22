import React from "react";
import axios from 'axios';
import './index.css';

function Login() {

    async function SignIn (event){
        event.preventDefault(); // Impede o recarregamento da página
        const mail = document.getElementById("e-mail").value;
        const senha = document.getElementById("password").value;

        const response = await axios.post('https://ladies-of-wisdom-production.up.railway.app/users/signin', {
            email: mail, senha: senha
        })

        console.log(response.data);

        if(response.data.success == true){
            window.location.href = '/home';
        } else{
            document.getElementById('wrong-login').style.display = 'flex'
        }
    }

    return(
        <div>
            <section id="secao">
                <img src="./assets/Logo.png" id="logo-login"/>
                <form id="login" onSubmit={SignIn}>
                    <h2 id="title">LOGIN</h2>
                    <label htmlFor="e-mail"><b>E-mail:</b></label>
                    <input type="email" id="e-mail" className="log"/>
                    <label htmlFor="password"><b>Senha:</b></label>
                    <input type="password" id="password" className="log"/>

                    <span id="wrong-login">E-mail ou senha inválidos!</span>
                    <button type="submit" id="go">ENTRAR</button>
                    <p>Se você ainda não tem uma conta, entre em contato com as organizadoras do projeto por <a href="mailto:ladiesofwisdomm@gmail.com">aqui</a> para verificar a disponibilidade de vagas!</p>
                </form>
            </section>
        </div>
    )
}


export default Login;