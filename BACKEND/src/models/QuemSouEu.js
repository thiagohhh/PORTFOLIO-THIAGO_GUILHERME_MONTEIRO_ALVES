import { DataTypes } from "sequelize";
import conn from "../config/conn.js";


const QuemSouEu = conn.define("QuemSouEu",{

     "id": {
        "type": DataTypes.INTEGER,
        "primaryKey": true,
        "autoIncrement": true,
        "allowNull": false
    },
    "aluno_id":{
        "type": DataTypes.INTEGER,
        "allowNull": false
    },

    "titulo":{
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "itinerario":{
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "paragrafo_biografia":{
        "type": DataTypes.TEXT,
        "allowNull": false
    },
    "texto_negrito":{
        "type": DataTypes.STRING,
        "allowNull": false
    },
    "url_foto":{
        "type": DataTypes.STRING,
        "allowNull": false
    },




},{
     "tableName": "quem_sou_eu" ,
     "timestamps": false
})

export default QuemSouEu