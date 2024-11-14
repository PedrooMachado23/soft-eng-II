import axios from "axios";

const base_url = 'http://localhost:4000'

export const fecthUsers = async() => {
    try {
        const response = await axios.get(`${base_url}/getAllUsers/1`)
        return response.data
    } catch (error) {
        console.error(`Erro ao carregar usuários: ${error}`)
    }
}

export const alterUser = async(userData: any) => {
    try{
        const response = await axios.put(`${base_url}/alterUser`, userData)
        return response
    } catch (error){
        console.error(`Erro ao alterar o usuário ${error}`)
        throw error
    }
}

export const createUser = async(userData: any) => {
    try {
        const response = await axios.post(`${base_url}/createUser/1`, userData)
        return response
    } catch (error){
        console.error(`Erro ao criar usuário ${error}`)
        throw error
    }
}

export const deleteUser = async(userId: number) => {
    try {
        const response = await axios.delete(`${base_url}/deleteUser/${userId}`)
        return response
    } catch (error) {
        console.error(`Erro ao deletar usuário ${error}`)
        throw error
    }
}