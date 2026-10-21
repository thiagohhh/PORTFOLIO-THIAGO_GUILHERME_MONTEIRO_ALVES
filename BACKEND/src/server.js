import "dotenv/config";
import conn from "./config/conn.js";
import app from "./app.js";
import "./models/index.js"; // carrega os models

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

    app.listen(PORT, () => {
      console.log("Servidor iniciado em http://localhost:" + PORT);
    });
  } catch (erro) {
    console.log("Erro ao iniciar o servidor:", erro.message);
    process.exitCode = 1;
  }
}

iniciarServidor();