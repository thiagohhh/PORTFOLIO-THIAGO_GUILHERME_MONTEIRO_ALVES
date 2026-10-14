import express from "express"
import cors from "cors"

//ROTAS


const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json())



app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada" })
 })

export default app