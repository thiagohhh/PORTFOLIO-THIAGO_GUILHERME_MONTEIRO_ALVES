import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const FundamentoTeorico = conn.define("FundamentoTeorico", {
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
    resumo_teorico: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O resumo teórico é obrigatório." },
            notEmpty: { msg: "O resumo teórico não pode ser vazio." }
        }
    },
    teorias: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "As teorias são obrigatórias." },
            notEmpty: { msg: "As teorias não podem ser vazias." }
        }
    },
    conceitos: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "Os conceitos são obrigatórios." },
            notEmpty: { msg: "Os conceitos não podem ser vazios." }
        }
    },
    metodologias: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "As metodologias são obrigatórias." },
            notEmpty: { msg: "As metodologias não podem ser vazias." }
        }
    }
}, {
    tableName: "fundamentos_teoricos",
    timestamps: false
});

export default FundamentoTeorico;
