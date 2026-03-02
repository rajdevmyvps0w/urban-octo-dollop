const fs = require("fs");
const path = require("path");
const YT = require("../../lib/ytdl-core.js");

module.exports = {
  name: "ytvdl",
  alias: [],
  desc: "Download a YouTube video in selected quality",
  category: "Media",
  usage: `ytvdl <480|720|1080> <youtube url>`,
  react: "🍁",

  start: async (Miku, m, { args, prefix }) => {

    if (!args[0] || !args[1]) {
      return Miku.sendMessage(m.from, { text: `❗ *Invalid usage!*\n\n📌 *Format:* ${prefix}ytvdl <480|720|1080> <URL>` }, { quoted: m });
    }

    const quality = parseInt(args[0], 10);
    const url = args.slice(1).join(" ");

    try {
      await Miku.sendMessage(m.from, { text: "📥 *Downloading video...*\nPlease wait, big files take time ✨" }, { quoted: m });

      // 📥 Download using your core engine
      const { path: filePath, meta, size } = await YT.downloadMp4(url, quality);

      const fileSizeInMB = size / (1024 * 1024);
      const botName = Miku.user?.name || "Marin-MD";
      const captionText = `🍁 *Title:* ${meta.title}\n🏮 *Quality:* ${meta.quality}p\n📦 *Size:* ${fileSizeInMB.toFixed(2)} MB\n\n💖 Downloaded by *${botName}*`;

      // 📤 SMART SENDING (Using Stream instead of Buffer)
      if (fileSizeInMB > 64) {
        // --- 📄 Badi Files hamesha DOCUMENT ban kar jayengi ---
        await Miku.sendMessage(
          m.from,
          {
            document: { url: filePath }, // ✅ FIXED: Direct path use karne se crash nahi hoga
            mimetype: "video/mp4",
            fileName: `${meta.title}.mp4`,
            caption: captionText + `\n\n_Note: Sent as Document (Size > 64MB)_`,
          },
          { quoted: m }
        );
      } else {
        // --- 🎥 Choti files normal video ---
        await Miku.sendMessage(
          m.from,
          {
            video: { url: filePath }, // ✅ FIXED: Direct path
            mimetype: "video/mp4",
            caption: captionText,
          },
          { quoted: m }
        );
      }

      // 🧹 Cleanup
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    } catch (e) {
      console.error(e);
      await Miku.sendMessage(m.from, { text: `❌ *Error:* ${e.message}` }, { quoted: m });
    }
  }
};
