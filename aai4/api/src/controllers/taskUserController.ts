import { Request, Response } from "express"
import { findOneUserService } from "../services/userService"
import { createTaskUserService, getTaskWithUsersService } from "../services/taskUserService"
import { listOneTaskService } from "../services/taskService"

export const createTaskUserControl = async(req: Request, res: Response) => {
    try {
        const { name, userNames}= req.body

        const task = await listOneTaskService({nome: name})
        
        for (const name of userNames) {
            const user = await findOneUserService({nome: name});
            if (user && task) {
                await createTaskUserService(task.id, user.id);
            }
        }
        res.status(201).json({message: "Cadastro de task_user feito"})
    } catch (error) {
        res.status(409).json({message: `Erro ao acessar o serviço de criar task_user: ${error}`})
    }
}

export const getTaskWithUsersController = async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        const userNames = await getTaskWithUsersService(Number(id))
        res.status(201).json(userNames)
    } catch (error) {
        res.status(409).json({message: 'Erro ao acessar o serviço de listar task com usuários'})
    }
}