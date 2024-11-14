import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/databaseConn";
import TaskUser from "./taskUserModel";

class Task extends Model{
    public id!: number;
    public nome!: string;
    public pontos!: number;
    public descricao!: string;
}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pontos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'tasks',
    timestamps: false
})

//chaves estrangeiras
Task.hasMany(TaskUser, {foreignKey: 'id_task', as: 'task', onDelete: 'CASCADE'})
TaskUser.belongsTo(Task, {foreignKey: 'id_task', as: 'task', onDelete: 'CASCADE'})

export default Task