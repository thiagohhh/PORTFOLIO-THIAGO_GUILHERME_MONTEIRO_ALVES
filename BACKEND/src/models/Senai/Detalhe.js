import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Detalhe = conn.define("Detalhe", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O ID do item é obrigatório." },
            isInt: { msg: "O ID do item deve ser um número inteiro." },
            min: { args: [1], msg: "O ID do item deve ser maior que zero." }
        }
    },
    tipo_origem: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "O tipo de origem é obrigatório." },
            notEmpty: { msg: "O tipo de origem não pode ser vazio." }
        }
    },
    tag_identificacao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A tag de identificação é obrigatória." },
            notEmpty: { msg: "A tag de identificação não pode ser vazia." }
        }
    }
}, {
    tableName: "senai_detalhes",
    timestamps: false
});

export default Detalhe;
