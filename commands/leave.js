// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel the bot is connected to.',
  aliases: ['l', 'lc', 'lvc'],
  args: false,
  execute(client, message) {
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply(`I'm not currently in a voice channel!`);

    // Leave and send message.
    voiceChannel.leave();
    message.channel.send(`✔ Successfully disconnected from \`${voiceChannel.name}\``);
  }
};