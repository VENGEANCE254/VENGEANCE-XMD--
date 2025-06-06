const config = require('../config');
const { cmd } = require('../command');

// First Ping Command
cmd({
    pattern: "ping",
    alias: ["speed", "pong"],
    use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
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

        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // React to the message
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

        const text = `> *VENGEANCE-XMD SPEED: ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363400583993139@newsletter',
                    newsletterName: "VENGEANCE-XMD",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send PTT audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/x0on9r.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// Second Ping Command
cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, reply
}) => {
    try {
        const startTime = Date.now();
        const message = await conn.sendMessage(from, { text: '*PINGING...*' });
        const endTime = Date.now();
        const ping = endTime - startTime;

        await conn.sendMessage(from, {
            text: `*🔥 VENGEANCE-XMD SPEED : ${ping}ms*`
        }, { quoted: message });

    } catch (e) {
        console.log("Error in ping2:", e);
        reply(`${e}`);
    }
});
