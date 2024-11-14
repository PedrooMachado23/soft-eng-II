import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../database/databaseConn";

class TaskUser extends Model {
    public id!: number;
    public id_task!: number;
    public id_user!: number
}

TaskUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_task: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tasks',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
},
{
    sequelize,
    modelName: 'tasks_users',
    timestamps: false
})

export default TaskUser