import express from "express"
import cors from "cors"
import senaiRoutes from "./router/senaiRoutes.js";
import { publicFolder } from "./config/multer.js";

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use("/public", express.static(publicFolder));

app.use("/senai", senaiRoutes);

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" })
})

export default app