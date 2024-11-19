import User from "../models/user.Model"
import { alterUserService, createUserService, deleteUserService, findAllUsersService, findOneUserService } from "../services/userService"
import { Request, Response } from "express"

export const createUserControl = async (req: Request, res: Response) => {
    try {
        const {id_admin, name, email, phone, password} = req.body
        const userFind = await findOneUserService([{telefone: phone}, {email}])
        let newUser

        if (!userFind){
            const newUser = await createUserService(id_admin, name, email, phone, password)
            res.status(201).json({message: `Usuário ${newUser.nome} cadastrado com sucesso!`})
            
        } else {
            let user_prop
            if (userFind.email === email){
                user_prop = userFind.email
            } else {
                user_prop = userFind.telefone
            }
            res.status(409).json({message: `Usuário com o campo -> ${user_prop} <- já está cadastrado!`})
        }
    } catch (error) {
        res.status(409).json({ message: `Erro ao acessar o serviço de criar usuário: ${error}`})
    }
}

export const alterUserControl = async(req:Request, res: Response) => {
    try{
        const { id, name, email, phone, password} = req.body
        alterUserService(id, name, email, phone, password)
        res.status(201).json({ message: `Alteração bem sucedida`})
    } catch (error) {
        res.status(409).json({ message: `Erro ao acessar o serviço de alterar usuário ${error}` })
    }
}

export const listUsersControl = async(req: Request, res: Response) => {
    try {
        const id_admin = req.params.id_admin
        const users = await findAllUsersService(Number(id_admin))
        res.status(201).json(users)
    } catch (error) {
        res.status(409).json({ message: `Erro ao acessar o serviço de listar usuários: ${error}` });
    }
}

export const deleteUserControl = async(req: Request, res: Response) => {
    try {
        const id = req.params.id
        await deleteUserService(Number(id))
        res.status(200).json({ message: `Usuário deletado com sucesso!`})
    } catch (error) {
        res.status(409).json({ message: `Erro ao acessar o serviço de deletar usuário: ${error}`})
    }
}