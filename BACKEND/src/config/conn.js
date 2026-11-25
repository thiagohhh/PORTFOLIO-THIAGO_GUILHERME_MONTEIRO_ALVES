import { Sequelize } from "sequelize";
import pg from "pg";
import "dotenv/config";

let conn;

if (process.env.DATABASE_URL) {

  conn = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectModule: pg,
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  console.log("Banco: Supabase (Postgres)");
} else {

  conn = new Sequelize(
    process.env.DB_NAME || "portifolio_senaiEsesi",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "123456789",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      logging: false,
    }
  );
  console.log("Banco: MySQL local");
}

export default conn;
