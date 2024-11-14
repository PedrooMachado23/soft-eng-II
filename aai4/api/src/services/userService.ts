import { Op } from "sequelize";
import User from "../models/user.Model";

export const createUserService = async(id_admin: number, name: string, email: string, phone: number, password: string) => {
    try {
        await User.create({
            id_admin: id_admin,
            nome: name,
            email: email,
            telefone: phone,
            senha: password
        })
    } catch (error) {
       throw new Error(`Erro ao executar serviço de listar todos os usuários: ${error}`)
    }
}

export const alterUserService = async(id_user: number, name: string, email: string, phone: string, password: string) => {
    try{
        const user = await User.findOne({where: {id: id_user}})
        if (user){
            user.set({
                nome: name,
                email: email,
                telefone: phone,
                senha: password
            })
            await user.save()
        }
    } catch (error){
        throw new Error(`Erro ao executar serviço de alterar usuário ${error}`)
    }
}

export const findOneUserService = async(where_clauses: any) => {
    try {
        const user = User.findOne({where: {
            [Op.or] : where_clauses
        }})
        return user
    } catch (error) {
        throw new Error(`Erro ao executar o serviço de listar um usuário: ${error}`)
    }
}

export const findAllUsersService = async(id_admin: number) => {
    try{
        const users = User.findAll({where: {id_admin}})
        return users
        
    } catch (error) {
        throw new Error(`Erro ao executar o serviço de listar todos os usuários: ${error}`)
    }
}

export const deleteUserService = async(user_id: number) => {
    try {
        await User.destroy({where: {id: user_id}})
    } catch(error) {
        throw new Error(`Erro ao executar o serviço de deletar usuário: ${error}`)
    }
}