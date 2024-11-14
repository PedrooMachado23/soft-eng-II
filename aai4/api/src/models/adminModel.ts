import { Sequelize, DataTypes, Model } from "sequelize";
import { sequelize } from "../database/databaseConn";
import User from "./user.Model";

class Admin extends Model {
    public id!: number;
    public nome_social!: string;
    public nome_adm!: string;
    public email!: string;
    public cnpj!: string;
    public senha!: string
}

Admin.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome_social: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    sequelize,
    modelName: 'admins',
    timestamps: false
})

//chaves estrangeiras
Admin.hasMany(User, {foreignKey: 'id_admin', as: 'admin', onDelete: 'CASCADE'})
User.belongsTo(Admin, {foreignKey: 'id_admin', as: 'admin', onDelete: 'CASCADE'})

export default Admin