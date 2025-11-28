import express from "express";
import { generateMusic } from "../controllers/musicController.js";

const router = express.Router();

router.post("/generate", generateMusic);

export default router;
