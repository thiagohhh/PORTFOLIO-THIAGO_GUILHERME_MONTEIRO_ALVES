import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const EscolaParaVida = conn.define("EscolaParaVida", {
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
    "reflexao_experiencia": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "aplicacao_conhecimentos": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "influencia_forma_agir_pensar": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "habilidades_desenvolvidas": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "desafios_novas_etapas": {
        "type": DataTypes.TEXT,
        "allowNull": false
    }
}, {
    "tableName": "escola_para_vida",
    "timestamps": false
});

export default EscolaParaVida;
