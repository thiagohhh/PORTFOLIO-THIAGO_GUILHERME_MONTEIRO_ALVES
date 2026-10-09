import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ReflexaoCritica = conn.define("ReflexaoCritica", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aprendizado_academico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    aplicacao_pratica: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    melhorias_necessarias: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    momentos_desafiadores: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "reflexao_critica",
    timestamps: false
});

export default ReflexaoCritica;
