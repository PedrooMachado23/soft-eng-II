import Task from "../models/taskModel";

export const createTaskService = async(userData: any) => {
    console.log(userData)
    try {
        const task = await Task.create({
            nome: userData.nome,
            pontos: userData.pontos,
            descricao: userData.descricao
        })
        return task
    } catch (error) {
        throw new Error(`Erro ao executar serviço de criar task: ${error}`)
    }
}

export const listAllTasksService = async() => {
    try {
        const tasks = await Task.findAll()
        return tasks
    } catch (error) {
        throw new Error(`Erro ao executar o serviço de listar todas as tasks: ${error}`)
    }
}

export const alterTaskService = async(taskId: number, name: string, points: number, description: string) => {
    try {
        const task = await Task.findOne({where: {id: taskId}})
        console.log(task)
        if (task){
            task.set({
                nome: name,
                pontos: points,
                descricao: description
            })
            task.save()
        }
    } catch(error) {
        throw new Error(`Erro ao executar o serviço de alterar task: ${error}`)
    }
}

export const deleteTaskService = async(taskId: number) => {
    try {
        await Task.destroy({where: {id: taskId}})
    } catch (error) {
        throw new Error(`Erro ao executar o serviço de deletar todas as tasks: ${error}`)
    }
}