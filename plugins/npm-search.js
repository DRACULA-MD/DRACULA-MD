const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "npm",
  desc: "Recherche un paquet sur npm.",
  react: '📦',
  category: "convert",
  filename: __filename,
  use: ".npm <nom-du-paquet>"
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    // Vérifie si un nom de paquet est fourni
    if (!args.length) {
      return reply("Veuillez fournir le nom du paquet npm à rechercher. Exemple : .npm express");
    }

    const packageName = args.join(" ");
    const apiUrl = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;

    // Récupère les détails du paquet depuis le registre npm
    const response = await axios.get(apiUrl);
    if (response.status !== 200) {
      throw new Error("Paquet introuvable ou une erreur s’est produite.");
    }

    const packageData = response.data;
    const latestVersion = packageData["dist-tags"].latest;
    const description = packageData.description || "Aucune description disponible.";
    const npmUrl = `https://www.npmjs.com/package/${packageName}`;
    const license = packageData.license || "Inconnue";
    const repository = packageData.repository ? packageData.repository.url : "Non disponible";

    // Message de réponse formaté
    const message = `
*DRACULA-MD - RECHERCHE NPM*

*🔰 PAQUET NPM :* ${packageName}
*📄 DESCRIPTION :* ${description}
*⏸️ DERNIÈRE VERSION :* ${latestVersion}
*🪪 LICENCE :* ${license}
*🪩 RÉPERTOIRE :* ${repository}
*🔗 LIEN NPM :* ${npmUrl}
`;

    // Envoie du message
    await conn.sendMessage(from, { text: message }, { quoted: mek });

  } catch (error) {
    console.error("Erreur :", error);

    // Envoie des logs d'erreur détaillés sur WhatsApp
    const errorMessage = `
*❌ Erreur de la commande NPM*

*Message d'erreur :* ${error.message}
*Stack Trace :* ${error.stack || "Non disponible"}
*Horodatage :* ${new Date().toISOString()}
`;

    await conn.sendMessage(from, { text: errorMessage }, { quoted: mek });
    reply("Une erreur s’est produite lors de la récupération des informations du paquet npm.");
  }
});
