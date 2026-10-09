import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Competencia = conn.define("Competencia", {
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
    titulo_competencia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "senai_competencias",
    timestamps: false
});

export default Competencia;
