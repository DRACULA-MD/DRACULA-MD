const config = require('../config');
const { cmd, commands } = require('../command');

// Commande .ping
cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Vérifie le temps de réponse du bot.",
    category: "principal",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Empêcher les emojis identiques
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Réaction emoji
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `> *DRACULA-MD VITESSE : ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: "Tech",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Erreur dans la commande ping :", e);
        reply(`Une erreur s'est produite : ${e.message}`);
    }
});

// Commande .ping2
cmd({
    pattern: "ping2",
    desc: "Teste le délai de réponse du bot.",
    category: "principal",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*⏳ Vérification en cours...*' });
        const endTime = Date.now();
        const ping = endTime - startTime;
        await conn.sendMessage(from, {
            text: `*🚀 DRACULA-MD TEMPS DE RÉPONSE : ${ping}ms*`
        }, { quoted: message });
    } catch (e) {
        console.log(e);
        reply(`❌ Erreur : ${e}`);
    }
});￼Enter
