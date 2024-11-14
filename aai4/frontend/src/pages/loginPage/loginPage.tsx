import React from "react";
import './loginPage.css'
import PageHeader from "../../components/pageHeader/pageHeader";
import { useNavigate } from "react-router";

function Login(){
    const navigate = useNavigate()
    
    return(
        <div>
            <PageHeader title='Administradores'/>
            <div className="loginPageContent">
                <div className="loginContainer">
                    <form action="" className="loginForm">
                        <label htmlFor="">Email:</label> <br />
                        <input type="text" className="inputPattern"/> <br />

                        <label htmlFor="">Senha:</label> <br />
                        <input type="password" className="inputPattern"/>
                    </form>
                </div>
                <div className="loginButtonContainer">
                    <button className="registerButton">Registrar</button>
                    <button className="inputButton" onClick={() => navigate('usersAdmin')}>Entrar</button>
                </div>
            </div>
        </div>
        
    )
}

export default Login