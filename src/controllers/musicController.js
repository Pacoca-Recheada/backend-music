import { createMusic } from "../services/musicService.js";

export const generateMusic = async (req, res) => {
  try {
    const { title, lyrics, style } = req.body;

    if (!title || !lyrics || !style) {
      return res.status(400).json({ error: "Faltam campos obrigatórios." });
    }

    const audioUrl = await createMusic(title, lyrics, style);

    res.status(200).json({
      message: "Música gerada com sucesso 🎵",
      audioUrl
    });

  } catch (error) {
    console.error("Erro ao gerar música:", error);
    res.status(500).json({ error: "Falha ao gerar música." });
  }
};
