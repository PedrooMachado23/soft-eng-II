import axios from "axios";

const base_url = 'http://localhost:4000'

export const fetchTasks = async() => {
    try {
        const response = await axios.get(`${base_url}/listAllTasks`)
        return response.data
    } catch (error) {
        console.error(`Erro ao carregar as tasks: ${error}`)
    }
}

export const fetchUserTasks = async(taskId: number) => {
    try {
        const response = await axios.get(`${base_url}/getTaskWithUsers/${taskId}`)
        if (response) {
            const userNames = response.data.sort()
            return userNames.join(', ')
        }
    }catch (error) {
        console.error(`Erro ao relacionar task com usuários: ${error}`)
    }
}

export const createTask = async(taskData: any) => {
    try {
        const response = await axios.post(`${base_url}/createTask`, taskData)
        return response
    } catch (error) {
        console.error(`Erro ao criar task: ${error}`)
        throw error
    }
}

export const createTaskUser = async(taskName: string, usersString: string) => {
    try{
        const userNames = usersString.split(', ')
        const taskUserData = {name: taskName, userNames: userNames}

        const response = await axios.post(`${base_url}/createTaskUser`, taskUserData)
        return response
    } catch (error) {
        console.error(`Erro ao criar task: ${error}`)
        throw error
    }
}

export const deleteTask = async(taskId: number) => {
    try {
        const response = await axios.delete(`${base_url}/deleteTask/${taskId}`)
        return response
    } catch (error) {
        console.error(`Erro ao deletar task: ${error}`)
        throw error
    }
}

export const alterTask = async(taskData: any) => {
    try {
        const response = await axios.put(`${base_url}/altertask`, taskData)
        return response
    } catch(error) {
        console.error(`Erro ao alterar task`)
        throw error
    }
}