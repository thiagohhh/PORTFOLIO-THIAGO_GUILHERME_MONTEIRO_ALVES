import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Detalhe = conn.define("Detalhe", {
    "id": {
        "type": DataTypes.INTEGER,
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false
    },
    "item_id": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "tipo_origem": {
        "type": DataTypes.ENUM("projeto", "relatorio"),
        "allowNull": false
    },
    "tag_identificacao": {
        "type": DataTypes.STRING,
        "allowNull": false
    }
}, {
    "tableName": "senai_detalhes",
    "timestamps": false
});

export default Detalhe;
