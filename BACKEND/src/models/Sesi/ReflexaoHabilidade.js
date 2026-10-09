import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ReflexaoHabilidade = conn.define("ReflexaoHabilidade", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    reflexao_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome_habilidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "reflexao_habilidades",
    timestamps: false
});

export default ReflexaoHabilidade;
