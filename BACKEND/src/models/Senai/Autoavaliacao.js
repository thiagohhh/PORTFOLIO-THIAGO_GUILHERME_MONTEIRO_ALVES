import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Autoavaliacao = conn.define("Autoavaliacao", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unidade_curricular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nota_bolinhas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    percentual: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    justificativa_texto: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "senai_autoavaliacao",
    timestamps: false
});

export default Autoavaliacao;
