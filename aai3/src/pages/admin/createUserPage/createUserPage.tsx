import React from "react";
import Header from "../../../components/header/header";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import CreateUserContent from "../../../components/createUserContent/createUserContent";
import './createUserPage.css'

function CreateUserPage() {
    return (
        <div>
            <Header message='Usuários'/>
            <div className="contentContainer">
                <SideBarMenu/>
                <CreateUserContent title1='Cadastrar Usuários' title2='Usuários Cadastrados'/>
            </div>
        </div>
    )
}

export default CreateUserPage