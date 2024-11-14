import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/pageHeader/pageHeader";
import SideBarMenu from "../../../components/sideBarMenu/sideBarMenu";
import './adminTasksPage.css'
import ContentHeader from "../../../components/contentHeader/contentHeader";
import { alterTask, createTask, deleteTask, fetchTasks } from "./apiTask";

function AdminTasksPage(){
    type Task = {
        id: number,
        nome: string,
        pontos: string,
        descricao: string
    }

    const [activeContent, setActiveContent] = useState(1)
    const [tasks, setTasks] = useState<Task[]>([])
    const [editingTask, setEditingTask] = useState<Task|null>(null)
    const [newTask, setNewTask] = useState<Task>({
        id: 0,
        nome: '',
        pontos: '',
        descricao: ''
    })

    const loadTasks = async() => {
        const tasksData = await fetchTasks()
        setTasks(tasksData)
    }

    useEffect(() => {
        if (tasks.length === 0) {
            loadTasks()
        }
    }, [activeContent])

    useEffect(() => {
        if (editingTask && activeContent === 2) {
            setEditingTask(null)
        }
    }, [activeContent])

    const saveChanges = async() => {
        const task = editingTask || newTask

        for (let [key, value] of Object.entries(task)) {
            if (value === '' || value === null){
                window.alert('Por favor, preencha todos os campos')
                break
            }
        }

        if (editingTask) {
            try {
                const response = await alterTask({
                    id: task.id,
                    name: task.nome,
                    points: task.pontos,
                    description: task.descricao
                })
                window.alert(response.data.message)
                if (response.status !== 201) {
                    return
                }
                setEditingTask(null)
            } catch(error) {
                window.alert('Erro ao alterar task')
            }

        } else {
            try {
                const response = await createTask({
                    name: task.nome,
                    points: task.pontos,
                    description: task.descricao
                })
                window.alert(response.data.message)
                if (response.status !== 201) {
                    return
                }
                setNewTask({id: 0, nome: '', pontos: '', descricao: ''})
            } catch (error) {
                window.alert('Erro ao criar atividade')
                return
            }
        }
        loadTasks()
        setActiveContent(2)
    }

    const handleEditTaskClick = (id: number) => {
        const task = tasks.find(task => task.id === id)
        if (task){
            setEditingTask(task)
            setActiveContent(1)
        }
    }

    const handleDeletTaskClick = async(task: Task) => {
        const confirm = window.confirm(`Deseja deletar a task ${task.nome}`)
        if (confirm) {
            try {
                const response = await deleteTask(task.id)
                window.alert(response.data.message)
            } catch(error) {
                window.alert('Erro ao deletar tarefa')
            }
        }
        loadTasks()
    }

    return(
        <div>
            <PageHeader title='Atividades'/>
            <div className="contentPattern">
                <SideBarMenu page={1} />
                <div className="mainContentPattern">
                    <ContentHeader title1='Cadastrar Atividades' title2='Atividades Cadastradas' content={activeContent} setContent={setActiveContent} />
                    {activeContent === 1 && <div>
                        <div>
                            <form action="" className="tasksForm">
                                <label htmlFor=""> Nome:</label> <br />
                                <input type="text" className="inputPattern inputNome"
                                value={editingTask? editingTask.nome : newTask.nome}
                                onChange={editingTask? (e) => setEditingTask({...editingTask, nome: e.target.value}) : (e) => setNewTask({...newTask, nome: e.target.value})}
                                />

                                <div className="middleFormContainer">
                                    <div className="section1">
                                        <label htmlFor="">Usuários:</label> <br />
                                        <input type="text" className="inputPattern inputUsuarios"/>
                                    </div>
                                    <div className="section2">
                                        <label htmlFor="">Pontos:</label> <br />
                                        <input type="text" className="inputPattern inputPontos"
                                        value={editingTask? editingTask.pontos : newTask.pontos}
                                        onChange={editingTask? (e) => setEditingTask({...editingTask, pontos: e.target.value}) : (e) => setNewTask({...newTask, pontos: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <label htmlFor="">Descrição:</label>
                                <textarea className="inputPattern inputDescricao"
                                value={editingTask? editingTask.descricao : newTask.descricao}
                                onChange={editingTask? (e) => setEditingTask({...editingTask, descricao: e.target.value}) : (e) => setNewTask({...newTask, descricao: e.target.value})}
                                />
                            </form>

                            <button className="createTaskButton" onClick={() => saveChanges()}>{editingTask? 'Salvar' : 'Criar'}</button>
                        </div>
                    </div>}

                    {activeContent === 2 && <div className="seeTaskContainer">
                        {tasks.map(task => (
                            <div className="taskCardContainer">
                                <div className="taskCardHeader">
                                    <div className="taskTitle">
                                        <p>{task.nome}</p>
                                    </div>
                                    <span className="taskPoints">{task.pontos} pts</span>
                                </div>
                                <div className="taskCardDescriptionContainer">
                                    <p>{task.descricao}</p>
                                </div>
                                <div className="taskCardButtonContainer">
                                    <button className="deleteTaskButton" onClick={() => handleDeletTaskClick(task)}>Deletar</button>
                                    <button className="editTaskButton" onClick={() => handleEditTaskClick(task.id)}>Editar</button>
                                </div>
                            </div>
                        ))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default AdminTasksPage