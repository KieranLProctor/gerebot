// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'loop',
  description: 'Loops the track currently playing.',
  aliases: ['repeat', 'rpt', 'l'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can loop the track currently playing!');

    let isPlaying = await client.player.isPlaying(guildID);
    if (!isPlaying) return message.reply(`❌ I'm not currently playing anything!`);

    client.player.setRepeatMode(guildID, true);
    message.channel.send('looping');
  }
};