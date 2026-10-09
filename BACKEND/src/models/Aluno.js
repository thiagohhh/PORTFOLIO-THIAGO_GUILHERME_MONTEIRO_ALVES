import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

const Aluno = conn.define("Aluno", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        tableName: "aluno",
        timestamps: false
    })


export default Aluno