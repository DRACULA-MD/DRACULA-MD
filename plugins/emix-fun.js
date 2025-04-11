const { cmd } = require("../command");
const { fetchEmix } = require("../lib/emix-utils");
const { getBuffer } = require("../lib/functions");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

cmd({
    pattern: "emix",
    desc: "Combine deux émojis en un sticker.",
    category: "fun",
    react: "😃",
    use: ".emix 😂,🙂",
    filename: __filename,
}, async (conn, mek, m, { args, q, reply }) => {
    try {
        if (!q.includes(",")) {
            return reply("❌ *Utilisation :* .emix 😂,🙂\n_Envoie deux émojis séparés par une virgule._");
        }

        let [emoji1, emoji2] = q.split(",").map(e => e.trim());

        if (!emoji1 || !emoji2) {
            return reply("❌ Veuillez fournir deux émojis séparés par une virgule.");
        }

        let imageUrl = await fetchEmix(emoji1, emoji2);

        if (!imageUrl) {
            return reply("❌ Impossible de générer le mix d'émojis. Essayez avec d'autres émojis.");
        }

        let buffer = await getBuffer(imageUrl);
        let sticker = new Sticker(buffer, {
            pack: "DRACULA-MD",
            author: "Pharouk",
            type: StickerTypes.FULL,
            categories: ["🤩", "🎉"],
            quality: 75,
            background: "transparent",
        });

        const stickerBuffer = await sticker.toBuffer();
        await conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });

    } catch (e) {
        console.error("Erreur dans la commande .emix :", e.message);
        reply(`❌ Impossible de générer le mix d'émojis : ${e.message}`);
    }
});
