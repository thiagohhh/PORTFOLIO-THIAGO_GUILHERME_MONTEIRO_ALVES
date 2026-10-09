import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ProjetoTrabalho = conn.define("ProjetoTrabalho", {
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
    "tableName": "projetos_trabalhos_sesi",
    "timestamps": false
});

export default ProjetoTrabalho;
