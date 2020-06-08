// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'skip',
  description: 'Skips the track currently playing.',
  aliases: ['s', 'skp'],
  args: false,
  execute(message) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.reply(`I'm not currently in a voice channel!`);

    voiceChannel.leave()

    message.channel.send(`✔ Successfully disconnected from \`${voiceChannel.name}\``);
  }
};