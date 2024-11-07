import React from "react";
import Header from "../../../components/header/header";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import './profilePage.css'

function ProfilePage() {
    return (
        <div>
            <Header message='Perfil'></Header>
            <div className="contentContainer">
                <SideBarMenu></SideBarMenu>
                <h1 className="headerWip">WORK IN PROGRESS</h1>
            </div>
        </div>
    )
}

export default ProfilePage