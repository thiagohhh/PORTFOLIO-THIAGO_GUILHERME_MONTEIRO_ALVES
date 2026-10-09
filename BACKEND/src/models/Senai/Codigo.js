import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Codigo = conn.define("Codigo", {
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
    "unidade_curricular": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "titulo_codigo": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "descricao_linguagem": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "bloco_codigo": {
        "type": DataTypes.TEXT,
        "allowNull": false
    }
}, {
    "tableName": "senai_codigos",
    "timestamps": false
});

export default Codigo;
