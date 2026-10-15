import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Autoavaliacao = conn.define("Autoavaliacao", {
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
    nota_bolinhas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "A nota é obrigatória." },
            isInt: { msg: "A nota deve ser um número inteiro." },
            min: { args: [1], msg: "A nota mínima é 1." },
            max: { args: [5], msg: "A nota máxima é 5." }
        }
    },
    percentual: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O percentual é obrigatório." },
            isInt: { msg: "O percentual deve ser um número inteiro." },
            min: { args: [0], msg: "O percentual mínimo é 0." },
            max: { args: [100], msg: "O percentual máximo é 100." }
        }
    },
    justificativa_texto: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A justificativa é obrigatória." },
            notEmpty: { msg: "A justificativa não pode ser vazia." }
        }
    }
}, {
    tableName: "senai_autoavaliacao",
    timestamps: false
});

export default Autoavaliacao;
