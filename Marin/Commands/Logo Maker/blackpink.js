module.exports = {
    name: "blackpink",
    alias: ["bp"],
    desc: "Make Blackpink style logo.",
    react: "🎀",
    category: "Logo Maker",
    start: async (Miku, m, { prefix, text }) => {

        if (!text) return m.reply(`Example: *${prefix}blackpink Marin Bot*`);

        try {
            const api = `https://xzn.wtf/api/textpro/blackpink?text=${encodeURIComponent(text)}`;

            await Miku.sendMessage(
                m.from,
                {
                    image: { url: api },
                    caption: `Made by ${botName}`,
                },
                { quoted: m }
            );

        } catch (err) {
            console.error(err);
            return m.reply("❌ Unable to generate logo. API may be down.");
        }
    }
};
