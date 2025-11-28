import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===== ROTA PRINCIPAL (TESTE) =====
app.get("/", (req, res) => {
  res.send("Backend Music Online! 🚀");
});

// ===== ROTA PARA GERAR MÚSICA =====
app.post("/generate-music", async (req, res) => {
  try {
    const { title, lyrics, style } = req.body;

    if (!title || !lyrics || !style) {
      return res.status(400).json({
        error: "Faltou enviar: title, lyrics ou style!",
      });
    }

    // ===== CRIANDO O PROMPT FINAL =====
    const prompt = `
Título da Música: ${title}

Estilo desejado: ${style}

Letra:
${lyrics}

Gere uma música completa com esse estilo, mantendo o ritmo,
a emoção do texto e coerência musical.
    `;

    // ===== CHAMADA PARA ELEVENLABS MUSIC =====
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/music/generate",
      {
        prompt: prompt, // AQUI ESTÁ A MUDANÇA IMPORTANTE
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    return res.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error("ERRO ao gerar música:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});
