// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'seek',
  description: 'Seeks to the specific posisition in the track currently playing.',
  aliases: ['sek'],
  usage: '<position>',
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can skip the track currently playing!');

    let isPlaying = client.player.isPlaying(guildID);
    if(!isPlaying) return message.reply(`❌ There isn't a track currently playing!`);

    client.player.

    let song = await client.player.skip(guildID);
    message.channel.send('skipped');
  }
};