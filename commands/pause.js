// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'pause',
  description: 'Pauses the track currently playing.',
  aliases: ['pse'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to repeat the track currently playing!');

    let isPlaying = client.player.isPlaying(guildID);
    if (!isPlaying) return message.reply('❌ There is no track currently playing!');

    let song = await client.player.pause(guildID);
    message.channel.send('paused');
  }
};