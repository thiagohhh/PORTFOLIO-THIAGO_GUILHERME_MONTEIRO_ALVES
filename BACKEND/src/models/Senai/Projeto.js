import { DataTypes } from "sequelize";
import conn from "../../config/conn.js";

const Projeto = conn.define(
  "Projeto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    aluno_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "O ID do aluno é obrigatório." },
        isInt: { msg: "O ID do aluno deve ser um número inteiro." },
        min: { args: [1], msg: "O ID do aluno deve ser maior que zero." },
      },
    },
    unidade_curricular: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "A unidade curricular é obrigatória." },
        notEmpty: { msg: "A unidade curricular não pode ser vazia." },
      },
    },
    titulo_projeto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O título do projeto é obrigatório." },
        notEmpty: { msg: "O título do projeto não pode ser vazio." },
      },
    },
    texto_card: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "O texto do card é obrigatório." },
        notEmpty: { msg: "O texto do card não pode ser vazio." },
      },
    },

    url_foto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "A foto do projeto é obrigatória." },
        notEmpty: { msg: "A foto do projeto não pode ser vazia." },
      },
    },
  },
  {
    tableName: "senai_projetos",
    timestamps: false,
  },
);

export default Projeto;
