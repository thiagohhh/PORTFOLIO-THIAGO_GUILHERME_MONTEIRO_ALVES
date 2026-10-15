import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Codigo = conn.define("Codigo", {
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
    titulo_codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título do código é obrigatório." },
            notEmpty: { msg: "O título do código não pode ser vazio." }
        }
    },
    descricao_linguagem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A linguagem do código é obrigatória." },
            notEmpty: { msg: "A linguagem do código não pode ser vazia." }
        }
    },
    bloco_codigo: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O bloco de código é obrigatório." },
            notEmpty: { msg: "O bloco de código não pode ser vazio." }
        }
    }
}, {
    tableName: "senai_codigos",
    timestamps: false
});

export default Codigo;
