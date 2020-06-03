// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: "leave",
  description: "Leaves the voice channel the bot is connected to.",
  aliases: ["l", "lv", "lvc"],
  args: false,
  execute(message) {
    if (!message.member.voiceChannel) return message.reply(`I'm not currently in a voice channel!`);

    message.member.voiceChannel.leave();
  }
};