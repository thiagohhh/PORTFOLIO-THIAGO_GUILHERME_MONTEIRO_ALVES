import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ProjetoTrabalhoTag = conn.define("ProjetoTrabalhoTag", {
    "id": {
        "type": DataTypes.INTEGER,
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false
    },
    "projeto_id": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "tag_identificacao": {
        "type": DataTypes.STRING,
        "allowNull": false
    }
}, {
    "tableName": "projetos_sesi_detalhes",
    "timestamps": false
});

export default ProjetoTrabalhoTag;
