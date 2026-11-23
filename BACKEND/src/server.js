import "dotenv/config";
import bcrypt from "bcrypt";
import conn from "./config/conn.js";
import app from "./app.js";
import "./models/index.js"; // carrega os models
import Aluno from "./models/Aluno.js";

const PORT = 3333;

async function iniciarServidor() {
  try {
    
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET não configurado. Crie o arquivo BACKEND/.env"
      );
    }

   
    await conn.sync();
    // await conn.sync({ force: true }); 

    const totalAlunos = await Aluno.count();
    if (totalAlunos === 0 && process.env.USER_NAME && process.env.USER_EMAIL && process.env.USER_PASSWORD) {
      await Aluno.create({
        nome: process.env.USER_NAME,
        email: String(process.env.USER_EMAIL).trim().toLowerCase(),
        senha: await bcrypt.hash(process.env.USER_PASSWORD, 12),
      });
      console.log("Usuário admin criado a partir do .env");
    }

    const servidor = app.listen(PORT, () => {
      console.log("Servidor iniciado em http://localhost:" + PORT);
    });

    servidor.on("error", (erro) => {
      if (erro.code === "EADDRINUSE") {
        console.log(`Erro ao iniciar o servidor: a porta ${PORT} já está em uso.`);
      } else {
        console.log("Erro ao iniciar o servidor:", erro.message);
      }
      process.exitCode = 1;
    });
  } catch (erro) {
    console.log("Erro ao iniciar o servidor:", erro.message);
    process.exitCode = 1;
  }
}

iniciarServidor();