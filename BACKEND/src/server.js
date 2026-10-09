
import conn  from "./config/conn.js";
import app from "./app.js";

//exportacao noemada e by defal


const PORT = 3333;

const iniciarServidor = async () => {
  try {
    await conn.sync();

    app.listen(PORT, () => {
      console.log("Servidor inciado em http://localhots:", PORT);
    });
  } catch (error) {
    console.log("Erro ao iniciar o servidor:", error.message);
  }
};

await iniciarServidor();
