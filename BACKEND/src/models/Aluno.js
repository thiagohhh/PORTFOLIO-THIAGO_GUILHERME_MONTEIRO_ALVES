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
        allowNull: false,
        validate: {
            notNull: { msg: "O nome é obrigatório." },
            notEmpty: { msg: "O nome não pode ser vazio." }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: "O e-mail é obrigatório." },
            notEmpty: { msg: "O e-mail não pode ser vazio." },
            isEmail: { msg: "Informe um e-mail válido." }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A senha é obrigatória." },
            notEmpty: { msg: "A senha não pode ser vazia." }
        }
    }
},
    {
        tableName: "aluno",
        timestamps: false
    })


export default Aluno