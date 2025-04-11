const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "fancy",
  alias: ["font", "style"],
  react: "✍️",
  desc: "Convertit du texte en plusieurs styles de polices.",
  category: "tools",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) {
      return reply("❎ Veuillez fournir un texte à convertir en polices stylisées.\n\n*Exemple :* .fancy Bonjour");
    }

    const apiUrl = `https://www.dark-yasiya-api.site/other/font?text=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl);
    
    if (!response.data.status) {
      return reply("❌ Erreur lors de la récupération des polices. Veuillez réessayer plus tard.");
    }

    const fonts = response.data.result.map(item => `*${item.name} :*\n${item.result}`).join("\n\n");
    const resultText = `✨ *Convertisseur de polices stylisées* ✨\n\n${fonts}\n\n> *Propulsé par Pharouk*`;

    await conn.sendMessage(from, { text: resultText }, { quoted: m });
  } catch (error) {
    console.error("❌ Erreur dans la commande fancy :", error);
    reply("⚠️ Une erreur est survenue lors de la récupération des polices.");
  }
});
