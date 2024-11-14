import { alterTaskService, createTaskService, deleteTaskService, listAllTasksService } from "../services/taskService"
import { Request, Response } from "express"


export const createTaskControl = async(req: Request, res: Response) => {
    try{
        const { name, points, description } = req.body
        await createTaskService({nome: name, pontos: Number(points), descricao: description})
        console.log('hi')
        res.status(201).json({message: `Task ${name} cadastrada com sucesso`})
    } catch (error) {
        res.status(409).json({message: `Erro ao acessar o serviço de criar task: ${error}`})
    }
}

export const listAllTasksControl = async(req: Request, res: Response) => {
    try {
        const tasks = await listAllTasksService()
        res.status(201).json(tasks)
    } catch (error) {
        res.status(409).json({message: `Erro ao acessar o serviço de listas todas as tasks: ${error}`})
    }
}

export const alterTaskcontrol = async(req: Request, res: Response) => {
    try {
        const {id, name, points, description} = req.body
        await alterTaskService(id, name, Number(points), description)
        res.status(201).json({message: 'Task alterada com sucesso'})
    } catch (error) {
        res.status(409).json({message: 'Erro ao acessar o serviço de alterar task'})
    }
}

export const deleteTaskControl = async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        await deleteTaskService(Number(id))
        res.status(200).json({message: `Task deletada com sucesso`})
    }   catch (error) {
        res.status(409).json({message: `Erro ao acessar o serviço de deletar task`})
    }
}