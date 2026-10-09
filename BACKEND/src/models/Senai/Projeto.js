import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Projeto = conn.define("Projeto", {
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
    "titulo_projeto": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "texto_card": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "url_foto": {
        "type": DataTypes.STRING,
        "allowNull": false
    }
}, {
    "tableName": "senai_projetos",
    "timestamps": false
});

export default Projeto;
