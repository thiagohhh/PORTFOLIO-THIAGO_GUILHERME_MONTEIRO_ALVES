import { Sequelize } from "sequelize"


const conn = new Sequelize("portifolio_senaiEsesi", "root", "123456789", {
    host: "localhost",
    dialect: "mysql"
})

export default conn