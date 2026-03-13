const maker = require('mumaker');

module.exports = {
    name: "blood",
    alias: ["bld"],
    desc: "Make text logo.",
    react: "🍁",
    category: "Logo Maker",
    start: async (Miku, m, { prefix, text }) => {

        const botName = "Marin Bot";

        if (!text)
            return m.reply(`Example: *${prefix}blood Marin Bot*`);

        try {
            const url = "https://textpro.me/create-blood-text-on-the-wall-online-1013.html";

            const data = await maker.textpro(url, [text]);

            // IMPORTANT: data.result is the image URL
            await Miku.sendMessage(
                m.from,
                {
                    image: { url: data.result },
                    caption: `Made by ${botName}`
                },
                { quoted: m }
            );

        } catch (err) {
            console.log(err);
            m.reply("❌ An error occurred while generating the logo!");
        }
    }
};
