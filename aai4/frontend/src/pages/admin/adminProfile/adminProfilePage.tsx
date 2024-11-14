import React from "react";
import PageHeader from "../../../components/pageHeader/pageHeader";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import './adminProfilePage.css'

function AdminProfilePage() {
    return(
        <div>
            <PageHeader title='Perfil'/>
            <div className="contentPattern">
                <SideBarMenu page={3} />
                <h1 className="wip">WORK IN PROGRESS!!</h1>
            </div>
        </div>
    )
}

export default AdminProfilePage