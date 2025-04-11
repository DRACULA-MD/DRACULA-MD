const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fb",
  alias: ["facebook", "fbdl"],
  desc: "Télécharger des vidéos Facebook",
  category: "download",
  filename: __filename,
  use: "<URL Facebook>",
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    // Vérifie si une URL est fournie
    if (!q || !q.startsWith("http")) {
      return reply("*`Une URL Facebook valide est requise`*\n\nExemple : `.fb https://www.facebook.com/...`");
    }

    // Ajoute une réaction de chargement
    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    // Récupère l'URL de la vidéo via l'API
    const apiUrl = `https://www.velyn.biz.id/api/downloader/facebookdl?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    // Vérifie si la réponse de l'API est valide
    if (!data.status || !data.data || !data.data.url) {
      return reply("❌ Échec de la récupération de la vidéo. Essaie un autre lien.");
    }

    // Envoie la vidéo à l'utilisateur
    const videoUrl = data.data.url;
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      caption: "📥 *Vidéo Facebook téléchargée*\n\n- Propulsé par JawadTechX ✅",
    }, { quoted: m });

  } catch (error) {
    console.error("Erreur :", error); // Affiche l'erreur pour le debug
    reply("❌ Erreur lors de la récupération de la vidéo. Réessaye plus tard.");
  }
});
