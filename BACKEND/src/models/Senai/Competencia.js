import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Competencia = conn.define("Competencia", {
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
    unidade_curricular: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A unidade curricular é obrigatória." },
            notEmpty: { msg: "A unidade curricular não pode ser vazia." }
        }
    },
    titulo_competencia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título da competência é obrigatório." },
            notEmpty: { msg: "O título da competência não pode ser vazio." }
        }
    }
}, {
    tableName: "senai_competencias",
    timestamps: false
});

export default Competencia;
