import React from "react";
import Header from "../../../components/header/header";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import CreateTaskContent from "../../../components/createTaskContent/createTaskContent";


function CreateTaskPage() {
    return (
        <div>
            <Header message='Atividades'/>
            <div className="contentContainer">
                <SideBarMenu />
                <CreateTaskContent title1='Cadastrar Atividades' title2='Atividades Registradas' />
            </div>
        </div>
    )
}

export default CreateTaskPage