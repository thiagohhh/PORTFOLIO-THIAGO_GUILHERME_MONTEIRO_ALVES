import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ParticipacaoEmSala = conn.define("ParticipacaoEmSala", {
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
    registro_atividades: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O registro de atividades é obrigatório." },
            notEmpty: { msg: "O registro de atividades não pode ser vazio." }
        }
    },
    o_que_chamou_atencao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "O que chamou atenção é obrigatório." },
            notEmpty: { msg: "O que chamou atenção não pode ser vazio." }
        }
    },
    reflexao_pratica: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A reflexão da prática é obrigatória." },
            notEmpty: { msg: "A reflexão da prática não pode ser vazia." }
        }
    },
    autoavaliacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "A autoavaliação é obrigatória." },
            isInt: { msg: "A autoavaliação deve ser um número inteiro." },
            min: { args: [1], msg: "A autoavaliação deve ser maior que zero." }
        }
    },
    justificativa_autoavaliacao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A justificativa da autoavaliação é obrigatória." },
            notEmpty: { msg: "A justificativa da autoavaliação não pode ser vazia." }
        }
    }
}, {
    tableName: "participacao_sala",
    timestamps: false
});

export default ParticipacaoEmSala;
