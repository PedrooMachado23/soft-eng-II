import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || '',
        dialect: 'postgres'
    }
)

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados foi estabelecida com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
}

export {sequelize, testConnection}