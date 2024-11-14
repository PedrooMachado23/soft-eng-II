import { Sequelize, Model, DataTypes, INTEGER } from "sequelize";
import { sequelize } from "../database/databaseConn";
import TaskUser from "./taskUserModel";

class User extends Model {
    public id!: number;
    public id_admin!: number;
    public nome!: string;
    public email!: string;
    public telefone!: number;
    public senha!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admins',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'users',
    timestamps: false
})

//chaves estrangeiras
User.hasMany(TaskUser, {foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE'})
TaskUser.belongsTo(User, {foreignKey: 'id_user', as: 'user', onDelete: 'CASCADE'})

export default User