const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "news",
    desc: "Récupère les derniers titres d'actualité.",
    category: "news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("Aucun article d’actualité trouvé.");

        // Envoie chaque article comme un message séparé avec image et titre
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

  ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ Jᴀᴡᴀᴅ TᴇᴄʜX
            `;

            console.log('Article URL:', article.urlToImage); // Log de l’URL de l’image pour debug

            if (article.urlToImage) {
                // Envoie l’image avec une légende
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Envoie un message texte si aucune image n’est disponible
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Erreur lors de la récupération des actualités :", e);
        reply("Impossible de récupérer les actualités. Veuillez réessayer plus tard.");
    }
});
