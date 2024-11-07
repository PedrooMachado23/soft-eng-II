import React from "react";
import './sideBarMenu.css'
import { useNavigate } from "react-router-dom";

function SideBarMenu() {
    const navigate = useNavigate()

    return (
        <div className="sideBarContainer">
            <div className="linksContainer">
                <a href="/atividades">Atividades</a>
                <a href="/usuarios">Usuarios</a>
                <a href="/perfil">Perfil</a>
            </div>
            <button className="logoutButton" onClick={() => navigate('/')}>Logout</button>
        </div>
    )
}

export default SideBarMenu