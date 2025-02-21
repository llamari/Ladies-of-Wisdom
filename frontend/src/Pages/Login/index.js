import React from "react";
import axios from 'axios';

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
            console.log("UHULLLL")
        } else{
            console.log("aaaaa.....")
        }
    }

    return(
        <div>
            <div>
                <form id="login"onSubmit={SignIn}>
                    <input type="email" id="e-mail"/>
                    <input type="password" id="password"/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}


export default Login;