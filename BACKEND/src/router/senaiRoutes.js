import { Router } from "express";
import { criarCompetencia } from "../controller/senaiController.js";

const router = Router();

router.post("/competencias", criarCompetencia);

export default router;
