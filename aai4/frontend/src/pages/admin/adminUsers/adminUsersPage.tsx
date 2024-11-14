import React, { useEffect, useState } from "react";
import userIcon from '../../../assets/defaultUserImage.svg';
import PageHeader from "../../../components/pageHeader/pageHeader";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import ContentHeader from "../../../components/contentHeader/contentHeader";
import './adminUsersPage.css'
import { alterUser, createUser, deleteUser, fecthUsers } from "./api";

function AdminUsersPage() {
    type User = {
        id: number;
        id_admin: number;
        nome: string;
        email: string;
        telefone: string;
        senha: string;
    }

    const [activeContent, setActiveContent] = useState(1)
    const [users, setUsers] = useState<User[]>([])
    const [editingUser, setEditingUser] = useState<User|null>(null)
    const [newUser, setNewUser] = useState<User>({id: 0,
        id_admin: 1,
        nome: '',
        email: '',
        telefone: '',
        senha: ''})
    
    const loadUsers = async() => {
        const data = await fecthUsers()
        setUsers(data)
    }

    useEffect(() => {
        if (users.length === 0) {
            loadUsers()
        }
    }, [activeContent])

    useEffect(() => {
        if (editingUser && activeContent === 2) {
            setEditingUser(null)
        }
    }, [activeContent, editingUser])

    const saveChanges = async() => {
        const activeUser = editingUser? editingUser : newUser

        for (let [key, value] of Object.entries(activeUser)) {
            if (value === '' || value === null){
                window.alert('Por favor, preencha todos os campos')
                break
            }
        }
        if (editingUser){
            try {
                const response = await alterUser({
                    id: activeUser.id,
                    name: activeUser.nome,
                    email: activeUser.email,
                    phone: activeUser.telefone,
                    password: activeUser.senha
                })

                window.alert(response.data.message)
                if (response.status !== 201){
                    return
                }
                setEditingUser(null)
            } catch (error) {
                window.alert('Erro ao alterar usuário')
            }
        } else {
            try {
                const response = await createUser({
                    id_admin: activeUser.id_admin,
                    name: activeUser.nome,
                    email: activeUser.email,
                    phone: activeUser.telefone,
                    password: activeUser.senha
                })
                
                window.alert(response.data.message)
                if (response.status !== 201){
                    return
                }
                setNewUser({ id: 0, id_admin: 1, nome: '', email: '', telefone: '', senha: '' })
                
            } catch (error) {
                window.alert('Erro ao criar o usuário')
            }
        }
        loadUsers()
        setActiveContent(2)
    }

    const handleEditUserClick = (id: number) => {
        const userFound = users.find(user => user.id === id)
        if (userFound){
            setEditingUser(userFound)
            setActiveContent(1)
        }
    }

    const handleDeleteUserclick = async(user: any) => {
        const confirm = window.confirm(`Deseja deletar o usuário ${user.nome}`)
        if (confirm) {
            try {
                const response = await deleteUser(user.id)
                window.alert(response.data.message)
            } catch (error) {
                window.alert('Erro ao deletar usuário')
            }
            loadUsers()
        }
    }

    const formatPhoneNumber = (user: any) => {
        const phone = user.telefone
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }

    return(
        <div>
            <PageHeader title='Usuários'/>
            <div className="contentPattern">
                <SideBarMenu page={2}/>
                <div className="mainContentPattern">
                    <ContentHeader title1='Cadastrar Usuários' title2='Usuários Cadastrados' content={activeContent} setContent={setActiveContent}/>
                    {activeContent === 1 && <div>
                        <div className="contentPattern">
                            <div className="containerImage">
                                <img src={userIcon} alt="" className="createUserIcon"/>
                            </div>
                            <div className="createUserFormsContainer">
                                <form action="" className="createUserForm">
                                    <label htmlFor="">Nome:</label> <br />
                                    <input type="text" className="inputPattern"
                                    value={editingUser ? editingUser.nome : newUser.nome}
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, nome: e.target.value }): (e) => setNewUser({ ...newUser, nome: e.target.value })}/>
                                    <br />

                                    <label htmlFor="">Email:</label> <br />
                                    <input type="email" className="inputPattern"
                                    value={editingUser ? editingUser.email : newUser.email}
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, email: e.target.value }): (e) => setNewUser({ ...newUser, email: e.target.value })}/>
                                    <br />

                                    <label htmlFor="">Telefone:</label> <br />
                                    <input type="text" className="inputPattern" maxLength={11}
                                    value={editingUser ? editingUser.telefone : newUser.telefone}
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, telefone: e.target.value }): (e) => setNewUser({ ...newUser, telefone: e.target.value })}/>
                                    <br />

                                    <label htmlFor="">Senha:</label> <br />
                                    <input type="password" className="inputPattern"
                                    value={editingUser ? editingUser.senha : newUser.senha}
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, senha: e.target.value }): (e) => setNewUser({ ...newUser, senha: e.target.value })}/>
                                </form>
                            </div>
                        </div>
                        <button className="createUserButton" onClick={() => saveChanges()}>
                            {editingUser ? 'Salvar' : 'Criar'}
                        </button>
                    </div>}

                    {activeContent === 2 && <div className="seeUserContainer">
                        {users.map(user => (
                            <div className="userCardContainer">
                                <img src={userIcon} alt="profile pic." className="cardUserIcon"/>
                                <div className="dataContainer">
                                    <div className="topHalf">
                                        <p>{user.nome}</p>
                                    </div>
                                    <div className="bottomHalf">
                                        <p className="userEmail">{user.email}</p>
                                        <p className="userPhone">{formatPhoneNumber(user)}</p>
                                    </div>
                                </div>
                                <div className="userCardButtonContainer">
                                    <button className="userCardEditButton" onClick={() => handleEditUserClick(user.id)}>Editar</button>
                                    <button onClick={() => handleDeleteUserclick(user)}>Apagar</button>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default AdminUsersPage