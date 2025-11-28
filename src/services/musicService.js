import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const createMusic = async (title, lyrics, style) => {
  try {
    const response = await axios.post(
      "https://api.elevenlabs.io/v1/music/generate",
      {
        title,
        lyrics,
        style
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVEN_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const audioUrl = response.data?.audio_url;

    if (!audioUrl) {
      throw new Error("A ElevenLabs não retornou áudio.");
    }

    return audioUrl;

  } catch (error) {
    console.error("Erro na ElevenLabs:", error.response?.data || error);
    throw error;
  }
};
