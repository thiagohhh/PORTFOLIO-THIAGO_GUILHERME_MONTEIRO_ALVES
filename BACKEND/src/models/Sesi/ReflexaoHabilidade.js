import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ReflexaoHabilidade = conn.define("ReflexaoHabilidade", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    reflexao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O ID da reflexão é obrigatório." },
            isInt: { msg: "O ID da reflexão deve ser um número inteiro." },
            min: { args: [1], msg: "O ID da reflexão deve ser maior que zero." }
        }
    },
    nome_habilidade: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O nome da habilidade é obrigatório." },
            notEmpty: { msg: "O nome da habilidade não pode ser vazio." }
        }
    }
}, {
    tableName: "reflexao_habilidades",
    timestamps: false
});

export default ReflexaoHabilidade;
