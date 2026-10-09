import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Relatorio = conn.define("Relatorio", {
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
    "titulo_relatorio": {
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "paragrafo_relatorio": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "url_pdf": {
        "type": DataTypes.STRING,
        "allowNull": false
    }
}, {
    "tableName": "senai_relatorios",
    "timestamps": false
});

export default Relatorio;
