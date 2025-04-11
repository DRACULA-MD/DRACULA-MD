const axios = require("axios");
const fetch = require("node-fetch");
const { sleep } = require('../lib/functions');
const { cmd, commands } = require("../command");
const config = require("../config");

cmd({
  pattern: "ship",
  alias: ["match", "love"],
  desc: "Associe aléatoirement l'utilisateur avec un autre membre du groupe.",
  react: "❤️",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ Cette commande ne fonctionne que dans les groupes.");

    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;
    const participants = groupMetadata.participants.map(user => user.id);
    
    let randomPair;

    if (specialNumber && participants.includes(specialNumber) && sender !== specialNumber) {
      randomPair = specialNumber; // Toujours jumeler avec ce numéro si dispo
    } else {
      do {
        randomPair = participants[Math.floor(Math.random() * participants.length)];
      } while (randomPair === sender);
    }

    const message = `💘 *Âmes Sœurs Détectées !* 💘\n\n❤️ @${sender.split("@")[0]} + @${randomPair.split("@")[0]}\n\n💖 Félicitations pour ce match parfait ! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363354023106228@newsletter",
          newsletterName: "DRACULA-MD",
          serverMessageId: 666
        }
      }
    });

  } catch (error) {
    console.error("❌ Erreur dans la commande .ship :", error);
    reply("⚠️ Une erreur est survenue. Veuillez réessayer.");
  }
});￼Enter
