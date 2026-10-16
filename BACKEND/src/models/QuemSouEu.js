import { DataTypes } from "sequelize";
import conn from "../config/conn.js";

const QuemSouEu = conn.define(
  "QuemSouEu",
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

    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O título é obrigatório." },
        notEmpty: { msg: "O título não pode ser vazio." },
      },
    },
    itinerario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O itinerário é obrigatório." },
        notEmpty: { msg: "O itinerário não pode ser vazio." },
      },
    },
    paragrafo_biografia: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "A biografia é obrigatória." },
        notEmpty: { msg: "A biografia não pode ser vazia." },
      },
    },
    texto_negrito: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O texto em negrito é obrigatório." },
        notEmpty: { msg: "O texto em negrito não pode ser vazio." },
      },
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "A foto é obrigatória." },
        notEmpty: { msg: "A foto não pode ser vazia." },
      },
    },
  },
  {
    tableName: "quem_sou_eu",
    timestamps: false,
  },
);

export default QuemSouEu;
