import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ConexaoTeia = conn.define("ConexaoTeia", {
    "id": {
        "type": DataTypes.INTEGER,
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false
    },
    "conexao_id": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "materia_conectada": {
        "type": DataTypes.STRING,
        "allowNull": false
    }
}, {
    "tableName": "conexoes_teia",
    "timestamps": false
});

export default ConexaoTeia;
