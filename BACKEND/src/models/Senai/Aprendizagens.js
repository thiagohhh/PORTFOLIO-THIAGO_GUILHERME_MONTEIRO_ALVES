import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Aprendizagens = conn.define("Aprendizagens", {
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
    unidade_curricular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo_aprendizagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao_aprendizagem: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nivel_estrelas: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "senai_aprendizagens",
    timestamps: false
});

export default Aprendizagens;
