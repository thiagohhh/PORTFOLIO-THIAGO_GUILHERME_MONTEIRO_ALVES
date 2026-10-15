import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const EscolaParaVida = conn.define("EscolaParaVida", {
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
    reflexao_experiencia: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A reflexão sobre a experiência é obrigatória." },
            notEmpty: { msg: "A reflexão sobre a experiência não pode ser vazia." }
        }
    },
    aplicacao_conhecimentos: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A aplicação dos conhecimentos é obrigatória." },
            notEmpty: { msg: "A aplicação dos conhecimentos não pode ser vazia." }
        }
    },
    influencia_forma_agir_pensar: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A influência na forma de agir e pensar é obrigatória." },
            notEmpty: { msg: "A influência na forma de agir e pensar não pode ser vazia." }
        }
    },
    habilidades_desenvolvidas: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "As habilidades desenvolvidas são obrigatórias." },
            notEmpty: { msg: "As habilidades desenvolvidas não podem ser vazias." }
        }
    },
    desafios_novas_etapas: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "Os desafios e novas etapas são obrigatórios." },
            notEmpty: { msg: "Os desafios e novas etapas não podem ser vazios." }
        }
    }
}, {
    tableName: "escola_para_vida",
    timestamps: false
});

export default EscolaParaVida;
