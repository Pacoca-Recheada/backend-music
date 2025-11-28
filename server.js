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

    // Verificação básica
    if (!title || !lyrics || !style) {
      return res.status(400).json({
        error: "Faltou enviar: title, lyrics ou style!",
      });
    }

    // ===== PROMPT FINAL PARA ELEVENLABS =====
    const prompt = `
Título da música: ${title}

Estilo musical desejado: ${style}

Letra:
${lyrics}

Gere uma música completa seguindo a letra e o estilo mencionados.
A música deve ter coerência, clima adequado ao estilo e estrutura musical sólida.
    `;

    // ===== CHAMADA PARA ELEVENLABS =====
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/music/generate",
      {
        prompt: prompt,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
      }
    );

    // Retorna os dados da API
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

// ===== PORTA =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

