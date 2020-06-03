// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: "join",
  description: "Joins the voice channel you are connected to.",
  aliases: ["j", "jv", "jvc"],
  args: false,
  execute(message) {
    if (!message.member.voiceChannel) return message.reply(`You must be in a voice channel for me to join!`);

    message.member.voiceChannel.join()
      .then(connection => {

      })
      .catch(err => console.log(err));
  }
};