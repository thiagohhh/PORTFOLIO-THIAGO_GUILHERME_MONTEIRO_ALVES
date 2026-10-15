import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const ProjetoTrabalhoTag = conn.define("ProjetoTrabalhoTag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    projeto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "O ID do projeto é obrigatório." },
            isInt: { msg: "O ID do projeto deve ser um número inteiro." },
            min: { args: [1], msg: "O ID do projeto deve ser maior que zero." }
        }
    },
    tag_identificacao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "A tag de identificação é obrigatória." },
            notEmpty: { msg: "A tag de identificação não pode ser vazia." }
        }
    }
}, {
    tableName: "projetos_sesi_detalhes",
    timestamps: false
});

export default ProjetoTrabalhoTag;
