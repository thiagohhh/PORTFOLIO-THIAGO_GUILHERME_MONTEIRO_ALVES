import express from "express"
import cors from "cors"
import senaiRoutes from "./router/senaiRoutes.js";
import sesiRoutes from "./router/sesiRoutes.js";
import quemSouEuRoutes from "./router/quemSouEuRoutes.js";

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use("/senai", senaiRoutes);
app.use("/sesi", sesiRoutes);
app.use("/quemSouEu", quemSouEuRoutes);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" })
})

export default app