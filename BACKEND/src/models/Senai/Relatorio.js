import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Relatorio = conn.define("Relatorio", {
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
    titulo_relatorio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título do relatório é obrigatório." },
            notEmpty: { msg: "O título do relatório não pode ser vazio." }
        }
    },
    paragrafo_relatorio: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O texto do relatório é obrigatório." },
            notEmpty: { msg: "O texto do relatório não pode ser vazio." }
        }
    },
    url_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A URL do PDF é obrigatória." },
            notEmpty: { msg: "A URL do PDF não pode ser vazia." }
        }
    }
}, {
    tableName: "senai_relatorios",
    timestamps: false
});

export default Relatorio;
