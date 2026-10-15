import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Aprendizagens = conn.define("Aprendizagens", {
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
    titulo_aprendizagem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O título da aprendizagem é obrigatório." },
            notEmpty: { msg: "O título da aprendizagem não pode ser vazio." }
        }
    },
    descricao_aprendizagem: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "A descrição da aprendizagem é obrigatória." },
            notEmpty: { msg: "A descrição da aprendizagem não pode ser vazia." }
        }
    },
    nivel_estrelas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O nível de estrelas é obrigatório." },
            isInt: { msg: "O nível de estrelas deve ser um número inteiro." },
            min: { args: [1], msg: "O nível mínimo de estrelas é 1." },
            max: { args: [5], msg: "O nível máximo de estrelas é 5." }
        }
    }
}, {
    tableName: "senai_aprendizagens",
    timestamps: false
});

export default Aprendizagens;
