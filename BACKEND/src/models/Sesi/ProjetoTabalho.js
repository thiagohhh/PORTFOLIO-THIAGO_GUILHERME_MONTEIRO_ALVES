import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ProjetoTrabalho = conn.define("ProjetoTrabalho", {
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
    bimestre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O bimestre é obrigatório." },
            isInt: { msg: "O bimestre deve ser um número inteiro." },
            min: { args: [1], msg: "O bimestre mínimo é 1." },
            max: { args: [4], msg: "O bimestre máximo é 4." }
        }
    },
    titulo_projeto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título do projeto é obrigatório." },
            notEmpty: { msg: "O título do projeto não pode ser vazio." }
        }
    },
    texto_card: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O texto do card é obrigatório." },
            notEmpty: { msg: "O texto do card não pode ser vazio." }
        }
    },
    url_foto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A URL da foto é obrigatória." },
            notEmpty: { msg: "A URL da foto não pode ser vazia." }
        }
    }
}, {
    tableName: "projetos_trabalhos_sesi",
    timestamps: false
});

export default ProjetoTrabalho;
