import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ReflexaoCritica = conn.define("ReflexaoCritica", {
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
    aprendizado_academico: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O aprendizado acadêmico é obrigatório." },
            notEmpty: { msg: "O aprendizado acadêmico não pode ser vazio." }
        }
    },
    aplicacao_pratica: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A aplicação prática é obrigatória." },
            notEmpty: { msg: "A aplicação prática não pode ser vazia." }
        }
    },
    melhorias_necessarias: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "As melhorias necessárias são obrigatórias." },
            notEmpty: { msg: "As melhorias necessárias não podem ser vazias." }
        }
    },
    momentos_desafiadores: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "Os momentos desafiadores são obrigatórios." },
            notEmpty: { msg: "Os momentos desafiadores não podem ser vazios." }
        }
    }
}, {
    tableName: "reflexao_critica",
    timestamps: false
});

export default ReflexaoCritica;
