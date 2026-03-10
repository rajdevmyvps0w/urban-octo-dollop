// Commands/Logo/mylogo.js
const axios = require("axios");

module.exports = {
  name: "mylogo",
  alias: ["mlogo", "logo"],
  desc: "Generate logo using internal API",
  category: "Logo",
  react: "🖌️",

  start: async (Miku, m, { text, prefix }) => {
    if (!text) {
      return m.reply(`Logo text missing.\n\nExample: *${prefix}mylogo Marin MD*`);
    }

    try {
      // text = user text, theme tum choose kar sakte ho
      const theme = "neon"; // ya "fire"/"ice"/"dark" etc.

      // Agar bot aur API same machine / same process:
      const apiUrl = `http://127.0.0.1:${port}/logo?text=${encodeURIComponent(
        text
      )}&theme=${encodeURIComponent(theme)}`;

      const res = await axios.get(apiUrl, {
        responseType: "arraybuffer",
      });

      const buffer = Buffer.from(res.data);

      await Miku.sendImage(
        m.from,
        buffer,
        `✨ Your custom logo is ready!\nText: ${text}`,
        m
      );
    } catch (e) {
      console.error("mylogo cmd error:", e);
      m.reply("⚠️ Logo generate karte time error aa gaya.");
    }
  },
};