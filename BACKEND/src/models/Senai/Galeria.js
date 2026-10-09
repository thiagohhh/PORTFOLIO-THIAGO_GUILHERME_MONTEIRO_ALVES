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
        allowNull: false
    },
    unidade_curricular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_midia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo_midia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    explicado_a_midia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    url_arquivo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "senai_galeria",
    timestamps: false
});

export default Galeria;
