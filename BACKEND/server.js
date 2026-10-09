import express from "express"
import cors from "cors"
import conn from "./src/config/conn.js";
import Aluno from "./src/models/Aluno.js";
import QuemSouEu from "./src/models/QuemSouEu.js";

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Servidor rodando!");
})

conn.authenticate()
.then(() => {
    console.log("✅ Banco de dados conectado com sucesso!");


    app.listen(PORT, () => {
        console.log("'Servidor rodando na porta: ", PORT);
    });
}).catch((erro) => {
    console.error("Erro ao conectar com o banco:", erro);
});




