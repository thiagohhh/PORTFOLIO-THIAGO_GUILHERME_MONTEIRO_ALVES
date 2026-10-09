import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ParticipacaoEmSala = conn.define("ParticipacaoEmSala", {
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
    "registro_atividades": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "o_que_chamou_atencao": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "reflexao_pratica": {
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "autoavaliacao": {
        "type": DataTypes.INTEGER,
        "allowNull": false
    },
    "justificativa_autoavaliacao": {
        "type": DataTypes.TEXT,
        "allowNull": false
    }
}, {
    "tableName": "participacao_sala",
    "timestamps": false
});

export default ParticipacaoEmSala;
