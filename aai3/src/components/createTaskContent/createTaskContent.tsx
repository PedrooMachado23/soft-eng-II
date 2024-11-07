import React, { useEffect, useState } from "react";
import './createTaskContent.css'

function CreateTaskContent(props: any) {
    const [title1, setTitle1] = useState('')
    const [title2, setTitle2] = useState('')
    const [activeButton, setActiveButton] = useState(1)
    const [activeContent, setActiveContent] = useState(1)
    const [taskCards, setTaskCards] = useState([{
        id: 1,
        nome: 'Atividade 1',
        pontos: '1000',
        descricao: 'Essa é a primeira atividade do sistema. Apenas um teste para saber se está funcionando. Por favor, assim que puder entregue esta atividade'
    },
    {
        id: 2,
        nome: 'Atividade 2',
        pontos: '250',
        descricao: 'Segunda atividade do sistema. Outro teste e, dessa vez, uma atividade com menos pontuação mas não por isso menos importante.'
    }])

    const [newTaskCard, setNewTaskCard] = useState({id: taskCards.length +1, nome: '', pontos: '', descricao: ''})
    const [editingTaskCard, setEditingTaskCard] = useState<any>(null)

    const handleDeletButton = (cardId: any) => {
        setTaskCards(taskCards.filter(card => card.id !== cardId))
    }

    const handleEditButton = (card: any) => {
        setEditingTaskCard(card)
        setActiveButton(1)
        setActiveContent(1)
    }

    const handleSaveChanges = () => {
        const user = editingTaskCard || newTaskCard

        const taskEmptyFields = Object.entries(user).filter(([key, value]) => {
            if (typeof value === 'string') {
                return value.trim() === ''
            }
            return !value
        })

        if (taskEmptyFields.length > 0) {
            alert('Por favor, preencha todos os campos')
        } else {
            if (editingTaskCard) {
                setTaskCards(taskCards.map(card => (card.id === editingTaskCard.id ? editingTaskCard : card)))
                setEditingTaskCard(null)
            } else {
                const newId = taskCards.length > 0 ? Math.max(...taskCards.map(card => card.id)) + 1 : 1

                setTaskCards([...taskCards, {...newTaskCard, id: newId}])
                setNewTaskCard({id: newId, nome: '', pontos: '', descricao: ''})
            }
            setActiveButton(2)
            setActiveContent(2)
        }
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
                    onClick={() => [setActiveButton(2), setActiveContent(2)]}
                >{title2}</button>}
            </div>

            {(activeContent === 1) && <div className="createTaskContainer">
                <form action="">
                    <label htmlFor="">Nome:</label> <br />
                    <input type="text" className="inputPattern inputNome"
                    value={editingTaskCard ? editingTaskCard.nome : newTaskCard.nome}
                    onChange={editingTaskCard ? (e) => setEditingTaskCard({...editingTaskCard, nome: e.target.value}) : (e) => setNewTaskCard({...newTaskCard, nome: e.target.value})}/> <br />

                    <div className="middleFormContainer">
                        <div className="section1">
                            <label htmlFor="">Usuários</label> <br />
                            <input type="text" className="inputPattern inputUsuarios"/>
                        </div>
                        <div className="section2">
                            <label htmlFor="">Pontos:</label> <br />
                            <input type="text" className="inputPattern inputPontos"
                            value={editingTaskCard ? editingTaskCard.pontos : newTaskCard.pontos}
                            onChange={editingTaskCard ? (e) => setEditingTaskCard({...editingTaskCard, pontos: e.target.value}) : (e) => setNewTaskCard({...newTaskCard, pontos: e.target.value})}/>
                        </div>
                    </div>

                    <label htmlFor="">Descricao:</label> <br />
                    <textarea className="inputPattern inputDescricao"
                    value={editingTaskCard ? editingTaskCard.descricao : newTaskCard.descricao}
                    onChange={editingTaskCard ? (e) => setEditingTaskCard({...editingTaskCard, descricao: e.target.value}) : (e) => setNewTaskCard({...newTaskCard, descricao: e.target.value})}/>
                </form>

                <button className="createTaskButton" onClick={() => handleSaveChanges()}>{editingTaskCard ? 'Salvar' : 'Criar'}</button>
            </div>}

            {(activeContent === 2) && <div className="seeTaskContainer">
                {taskCards.map(card => (
                    <div className="taskCardContainer">
                        <div className="taskCardHeader">
                            <div className="textHeaderContainer">
                                <p>{card.nome}</p>
                            </div>
                            <p>{card.pontos} pts</p>
                        </div>
                        <div className="taskCardDescriptionContainer">
                            {card.descricao}
                        </div>
                        <div className="taskCardButtonContainer">
                            <button className="deleteTaskButton" onClick={() => handleDeletButton(card.id)}>Apagar</button>
                            <button className="editTaskButton" onClick={() => handleEditButton(card)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default CreateTaskContent