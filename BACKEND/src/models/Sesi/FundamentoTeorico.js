import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const FundamentoTeorico = conn.define("FundamentoTeorico", {
    "id": {
        "type": DataTypes.INTEGER,
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false
    },
    "aluno_id": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "bimestre": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "resumo_teorico": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "teorias": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "conceitos": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "metodologias": {
        "type": DataTypes.TEXT,
        "allowNull": false
    }
}, {
    "tableName": "fundamentos_teoricos",
    "timestamps": false
});

export default FundamentoTeorico;
