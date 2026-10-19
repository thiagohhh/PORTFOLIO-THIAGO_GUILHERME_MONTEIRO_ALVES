import {conn} from "./config/conn.js";
import app from "./app.js";
import "./models/index.js";

const PORT = 3333;

const iniciarServidor = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET não configurado. Crie o arquivo BACKEND/.env usando .env.example.");
    }

    await conn.sync();
   // await conn.sync({force: true});

    app.listen(PORT, () => {
      console.log("Servidor inciado em http://localhost:", PORT);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
    process.exitCode = 1;
  }
};

await iniciarServidor();
