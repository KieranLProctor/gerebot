// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel the bot is connected to.',
  aliases: ['lvc', 'lc', 'l'],
  args: false,
  execute(client, message) {
    //let clientChannel = client.bot.;

    // Leave and send message.
    let userVoiceChannel = message.member.voice.channel;
    userVoiceChannel.leave();
    message.channel.send(`✔ Successfully disconnected from \`${userVoiceChannel.name}\``);
  }
};