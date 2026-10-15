import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ConexaoTeia = conn.define("ConexaoTeia", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    conexao_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O ID da conexão é obrigatório." },
            isInt: { msg: "O ID da conexão deve ser um número inteiro." },
            min: { args: [1], msg: "O ID da conexão deve ser maior que zero." }
        }
    },
    materia_conectada: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A matéria conectada é obrigatória." },
            notEmpty: { msg: "A matéria conectada não pode ser vazia." }
        }
    }
}, {
    tableName: "conexoes_teia",
    timestamps: false
});

export default ConexaoTeia;
