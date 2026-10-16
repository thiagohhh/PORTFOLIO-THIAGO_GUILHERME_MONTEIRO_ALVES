import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Galeria = conn.define("Galeria", {
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
    tipo_midia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O tipo de mídia é obrigatório." },
            notEmpty: { msg: "O tipo de mídia não pode ser vazio." }
        }
    },
    titulo_midia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título da mídia é obrigatório." },
            notEmpty: { msg: "O título da mídia não pode ser vazio." }
        }
    },
    explicado_a_midia: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A explicação da mídia é obrigatória." },
            notEmpty: { msg: "A explicação da mídia não pode ser vazia." }
        }
    },
    arquivo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O arquivo é obrigatório." },
            notEmpty: { msg: "O arquivo não pode ser vazio." }
        }
    }
}, {
    tableName: "senai_galeria",
    timestamps: false
});

export default Galeria;
