const discordEmoji = require('discord-emoji');

let allEmojis = {};
Object.keys(discordEmoji).forEach(category => {
    Object.assign(allEmojis, discordEmoji[category]);
});

let emojisJs = `const EMOJI_MAPPING = ${JSON.stringify(allEmojis)};\n`;
console.log(emojisJs);
