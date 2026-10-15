import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ConexaoInterdisciplinar = conn.define("ConexaoInterdisciplinar", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O ID do aluno é obrigatório." },
            isInt: { msg: "O ID do aluno deve ser um número inteiro." },
            min: { args: [1], msg: "O ID do aluno deve ser maior que zero." }
        }
    },
    relacoes_interdisciplinares: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "As relações interdisciplinares são obrigatórias." },
            notEmpty: { msg: "As relações interdisciplinares não podem ser vazias." }
        }
    }
}, {
    tableName: "conexoes_interdisciplinares",
    timestamps: false
});

export default ConexaoInterdisciplinar;
