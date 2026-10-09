import express from "express"
import cors from "cors"


const app = express()

app.use(cors({
    origin: "*", //url do frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

app.use((request, response) => {
    response.status(404).json({
        status: 404,
        statusError: "Not Found",
        error: "Rota não encontrada"
    })
})

export default app