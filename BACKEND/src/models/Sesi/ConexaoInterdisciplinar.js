import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ConexaoInterdisciplinar = conn.define("ConexaoInterdisciplinar", {
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
    "relacoes_interdisciplinares": {
        "type": DataTypes.TEXT,
        "allowNull": false
    }
}, {
    "tableName": "conexoes_interdisciplinares",
    "timestamps": false
});

export default ConexaoInterdisciplinar;
