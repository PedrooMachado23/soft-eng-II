import React, { useEffect, useState } from "react";
import UserIcon from '../../assets/defaultUserImage.svg'
import './createUserContent.css'

function CreateUserContent(props: any) {
    const [activeContent, setActiveContent] = useState(1)
    const [title1, setTitle1] = useState(props.title1)
    const [title2, setTitle2] = useState(props.title2)
    const [activeButton, setActiveButton] = useState(1)
    const [users, setUsers] = useState([{
        id: 1,
        nome: 'Pedro Henrique Machado Martins',
        email: 'meu.email001@aleatorio.com',
        telefone: '(12) 98182-7581'
    },
    {
        id: 2,
        nome: 'Ana Maria Machado',
        email: 'meu.email002@aleatorio.com',
        telefone: '(12) 98117-1877'
    },
    {   
        id: 3,
        nome: 'Ronildo Antonio Martins',
        email: 'meu.email003@aleatorio.com',
        telefone: '(12) 00000-0000'
    },
    {
        id: 4,
        nome: 'Vitor Hugo Machado Martins',
        email: 'meu.email001@aleatorio.com',
        telefone: '(12) 11111-1111'
    },
    ])

    const [editingUser, setEditingUser] = useState<any>(null)

    const [newUser, setNewUser] = useState({id:users.length + 1, nome: '', email: '', telefone: ''})

    const handleEditClick = (user: any) => {
        setEditingUser(user)
        setActiveButton(1)
        setActiveContent(1)
    }

    const handleSaveChanges = () => {
        const user = editingUser || newUser;
      
        const emptyFields = Object.entries(user).filter(([key, value]) => {
          if (typeof value === 'string') {
            return value.trim() === ''; 
          }
          return !value;
        });
      
        if (emptyFields.length > 0) {
          alert('Por favor, preencha todos os campos!');
        } else {
          if (editingUser) {
            setUsers(users.map(u => (u.id === editingUser.id ? editingUser : u)));
            setEditingUser(null);
          } else {
            const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;

            setUsers([...users, { ...newUser, id: newId }]);
            setNewUser({ id: newId, nome: '', email: '', telefone: '' });
          }
      
          setActiveButton(2);
          setActiveContent(2);
        }
      };
      

    const handleDeleteClick = (userId: number) => {
        setUsers(users.filter(user => user.id !== userId))
    }

    useEffect(() => {
        setTitle1(props.title1);
        setTitle2(props.title2);
    }, [props.title1, props.title2]);

    return (
        <div className="mainContainer">
            <div  className='headerContainer'> 
                <button className={`headerButton 
                    ${!title2 ? 'singleHeaderTitle' : 'headerTitle1'} 
                    ${activeButton === 1 ? 'activeButton' : ''}`}
                    onClick={()=> [setActiveButton(1), setActiveContent(1)]}
                >{title1}</button>

                {title2 && <div className="verticalBar"></div>}

                {title2 && <button className={`headerTitle2 headerButton 
                    ${activeButton === 2 ? 'activeButton' : ''}`}
                    onClick={() => [setActiveButton(2), setActiveContent(2), setNewUser({ id: users.length + 1, nome: '', email: '', telefone: '' })]}
                >{title2}</button>}
            </div>
                

                {(activeContent === 1) && <div className="createUserContainer">
                    <div className="createUserContent">
                        <div className="containerImage">
                            <img src={UserIcon} alt="Ícone padrão de usuário" className="userIcon"/>
                        </div>
                        <div className="fieldsContainer">
                            <form action="" className="createUserForm">
                                <label htmlFor="">Nome:</label> <br />
                                <input type="text"
                                    value={editingUser ? editingUser.nome : newUser.nome} 
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, nome: e.target.value }): (e) => setNewUser({ ...newUser, nome: e.target.value })}
                                    /> <br />

                                <label htmlFor="">Email:</label> <br />
                                <input type="text"
                                    value={editingUser ? editingUser.email : newUser.email} 
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, email: e.target.value }): (e) => setNewUser({ ...newUser, email: e.target.value })}
                                    /> <br />

                                <label htmlFor="">Telefone:</label> <br />
                                <input type="text"
                                    value={editingUser ? editingUser.telefone : newUser.telefone} 
                                    onChange={editingUser? (e) => setEditingUser({ ...editingUser, telefone: e.target.value }): (e) => setNewUser({ ...newUser, telefone: e.target.value })}
                                    />

                                <label htmlFor="">Senha:</label>
                                <input type="password" />
                            </form>
                        </div>
                    </div>
                    <button className="createUserButton" onClick={() => handleSaveChanges()}>
                        {editingUser ? 'Salvar' : 'Criar'}
                    </button>
                </div>}

                {(activeContent === 2) && <div className="seeUserContainer">
                    {users.map(user => (
                        <div className="userCardContainer">
                            <img src={UserIcon} alt="Ícone padrão de usuário" className="seeUserIcon" />
                            <div className="dataContainer">
                                <div className="topHalf">
                                    <p className="userName">{user.nome}</p>
                                </div>
                                <div className="bottomHalf">
                                    <p className="userEmail">{user.email}</p>
                                    <p className="userPhone">{user.telefone}</p>
                                </div>
                            </div>
                            <div className="userCardButtonContainer">
                                <button className="userCardEditButton" onClick={() => handleEditClick(user)}>Editar</button>
                                <br />
                                <button onClick={() => handleDeleteClick(user.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>}
        </div>
    )
}

export default CreateUserContent