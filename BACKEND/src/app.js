import express from "express"
import cors from "cors"
import senaiRoutes from "./router/senaiRoutes.js";
import sesiRoutes from "./router/sesiRoutes.js";
import quemSouEuRoutes from "./router/quemSouEuRoutes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(
    express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public"))
)

app.use("/senai", senaiRoutes);
app.use("/sesi", sesiRoutes);
app.use("/quemSouEu", quemSouEuRoutes);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" })
})

export default app