import React from "react";
import Header from "../../../components/header/header";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import './loginAdmPage.css'
import { useNavigate } from "react-router-dom";

function LoginAdmPage() {
    const navigate = useNavigate()
    
    return (
        <div>
            <Header message='Administradores'></Header>
            <div className="loginAdmContainer">
                <form action="" className="loginForm">
                    <label htmlFor="">Email:</label> <br />
                    <input type="text" /> <br />

                    <label htmlFor="">Senha:</label> <br />
                    <input type="text" /> <br />
                </form>
            </div>
            <div className="loginAdmButtonContainer">
                <button className="registerAdmButton">Registrar</button>
                <button className="loginAdmButton" onClick={() => navigate('/usuarios')}>Entrar</button>
            </div>
        </div>
    )
}

export default LoginAdmPage
