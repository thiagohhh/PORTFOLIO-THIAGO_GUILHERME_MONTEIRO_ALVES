import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import senaiRoutes from "./router/senaiRoutes.js";
import sesiRoutes from "./router/sesiRoutes.js";
import quemSouEuRoutes from "./router/quemSouEuRoutes.js";
import alunoRoutes from "./router/alunoRoutes.js";
import { tratarErro } from "./utils/errorHandle.js";

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());


const pastaPublic = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../public"
);
app.use(express.static(pastaPublic));

app.use("/alunos", alunoRoutes);
app.use("/senai", senaiRoutes);
app.use("/sesi", sesiRoutes);
app.use("/quemSouEu", quemSouEuRoutes);

app.use((error, request, response, _next) => {
  return tratarErro(error, response);
});


app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

export default app;