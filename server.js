import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import musicRoutes from "./src/routes/musicRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/music", musicRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🔥 Server rodando na porta ${process.env.PORT}`);
});
