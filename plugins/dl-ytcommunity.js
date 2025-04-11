const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ytpost",
    alias: ["ytcommunity", "ytc"],
    desc: "Télécharger une publication communauté YouTube",
    category: "downloader",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Merci de fournir un lien de publication YouTube.\nExemple : `.ytpost <url>`");

        const apiUrl = `https://api.siputzx.my.id/api/d/ytpost?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌");
            return reply("Échec lors de la récupération de la publication. Vérifie le lien.");
        }

        const post = data.data;
        let caption = `📢 *Publication Communauté YouTube* 📢\n\n` +
                      `📜 *Contenu :* ${post.content}`;

        if (post.images && post.images.length > 0) {
            for (const img of post.images) {
                await conn.sendMessage(from, { image: { url: img }, caption }, { quoted: mek });
                caption = ""; // Ajouter la légende une seule fois
            }
        } else {
            await conn.sendMessage(from, { text: caption }, { quoted: mek });
        }

        await react("✅");
    } catch (e) {
        console.error("Erreur dans la commande ytpost :", e);
        await react("❌");
        reply("Une erreur est survenue lors de la récupération de la publication YouTube.");
    }
});
