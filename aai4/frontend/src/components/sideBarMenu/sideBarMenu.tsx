import React from "react";
import { useNavigate } from "react-router";
import './sideBarMenu.css'

function SideBarMenu(props: any){
    const navigate = useNavigate()
    const page = props.page

    return (
        <div className="sideBarContainer">
            <div className="buttonMenuContainer">
                <button className={`buttonAtividades transitionButton ${page === 1 ? 'activeButtonPattern' : ''}`} onClick={() => navigate('/tasksAdmin')}>Atividades</button>
                <button className={`buttonUsers transitionButton ${page === 2 ? 'activeButtonPattern' : ''}`} onClick={() => navigate('/usersAdmin')}>Usuários</button>
                <button className={`buttonProfile transitionButton ${page === 3 ? 'activeButtonPattern' : ''}`} onClick={() => navigate('/profileAdmin')}>Perfil</button>
            </div>
            <button className="logoutButton" onClick={() => navigate('/')}>Logout</button>
        </div>
    )
}

export default SideBarMenu