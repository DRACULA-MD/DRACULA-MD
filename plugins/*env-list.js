const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

// Fonction pour vérifier si une variable est "activée"
function estActivé(valeur) {
    return valeur && valeur.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["paramètres", "variables"],
    desc: "Afficher les paramètres du bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Définition du message des paramètres
        let paramètresBot = `╭━━━〔 *DRACULA-MD* 〕━━━┈⊷
┃▸╭────────────
┃▸┃๏ *PARAMÈTRES ENV 🧪*
┃▸└────────────···๏
╰────────────────┈⊷
╭━━〔 *Activé / Désactivé* 〕━━┈⊷
┇๏ *Affichage Statut:* ${estActivé(config.AUTO_STATUS_SEEN) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Réponse Statut:* ${estActivé(config.AUTO_STATUS_REPLY) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Réponse Auto:* ${estActivé(config.AUTO_REPLY) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Sticker Auto:* ${estActivé(config.AUTO_STICKER) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Voix Auto:* ${estActivé(config.AUTO_VOICE) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Réactions Perso:* ${estActivé(config.CUSTOM_REACT) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Réaction Auto:* ${estActivé(config.AUTO_REACT) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Suppression Liens:* ${estActivé(config.DELETE_LINKS) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Anti-Lien:* ${estActivé(config.ANTI_LINK) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Anti-Gros Mots:* ${estActivé(config.ANTI_BAD) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Saisie Auto:* ${estActivé(config.AUTO_TYPING) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Enregistrement Auto:* ${estActivé(config.AUTO_RECORDING) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Toujours En Ligne:* ${estActivé(config.ALWAYS_ONLINE) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Mode Public:* ${estActivé(config.PUBLIC_MODE) ? "Activé ✅" : "Désactivé ❌"}
┇๏ *Lecture Messages:* ${estActivé(config.READ_MESSAGE) ? "Activé ✅" : "Désactivé ❌"}
╰━━━━━━━━━━━━━━━──┈⊷
> ${config.DESCRIPTION}`;

        // Envoie du message avec image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/juroe8.jpg' },
                caption: paramètresBot,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363354023106228@newsletter',
                        newsletterName: "Pharouk Tech",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Envoie du message vocal
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/XdTechPro/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`Erreur : ${error.message}`);
    }
});
