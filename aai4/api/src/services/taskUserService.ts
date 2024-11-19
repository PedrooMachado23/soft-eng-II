import Task from "../models/taskModel"
import TaskUser from "../models/taskUserModel"
import User from "../models/user.Model"

export const createTaskUserService = async(taskId: number, userId: number) => {
    try {
        TaskUser.create({
            id_task: taskId,
            id_user: userId
        })
    } catch (error) {
        throw new Error(`Erro ao executar serviço de cadastrar task_user`)
    }
}

export const getTaskWithUsersService = async(taskId: number) => {
    try {
        const task = await Task.findOne({
            where: { id: taskId },
            include: [
                {
                    model: TaskUser,
                    as: 'task',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            attributes: ['id', 'nome', 'email', 'telefone'] 
                        }
                    ]
                }
            ]
        });
        if (task){
            const userNames = task.task.map((taskUser: any) => taskUser.user?.dataValues?.nome).filter(Boolean);
            return userNames;
        } else {
            throw new Error(`Tarefa ${taskId} não existente`)
        }
    } catch (error) {
        throw new Error(`Erro ao buscar task com usuários: ${error}`);
    }
}