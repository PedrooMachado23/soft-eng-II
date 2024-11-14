import express from 'express'
import routes from './routes'
import cors from 'cors'
import { testConnection } from './database/databaseConn';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())
app.use('/', routes)

app.listen(port, async () => {
    try{
        console.log(`Servidor rodando na porta ${port}`)
        await testConnection()
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
})