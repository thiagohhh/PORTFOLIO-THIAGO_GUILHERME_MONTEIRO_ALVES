import { Sequelize } from "sequelize";
import "dotenv/config";

// ============================================================
// CONEXÃO COM O BANCO (Supabase ou MySQL local)
// Forma júnior: preencha o .env e pronto.
// ============================================================
//
// OPÇÃO 1 — Supabase (recomendado para publicar na internet):
//   No painel do Supabase: Settings → Database → Connection string → URI
//   Cole em DATABASE_URL no arquivo .env
//
// OPÇÃO 2 — MySQL na sua máquina (só você vê os dados):
//   Deixe DATABASE_URL vazio e use DB_HOST, DB_NAME, etc.
// ============================================================

let conn;

if (process.env.DATABASE_URL) {
  // Supabase = Postgres na nuvem
  conn = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
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
  // MySQL local (desenvolvimento)
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
