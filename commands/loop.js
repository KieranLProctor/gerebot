// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'loop',
  description: 'Loops the track currently playing.',
  aliases: ['repeat', 'rpt', 'l'],
  args: false,
  execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel before I can loop the track currently playing!');

    client.player.setRepeatMode(guildID, true);
    message.channel.send('looping');
  }
};