// Dependencies.
const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = {
  name: 'pause',
  description: 'Pauses the track currently playing.',
  aliases: ['pse'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to repeat the track currently playing!');

    // Check if currently playing anything.
    let isPlaying = client.player.isPlaying(guildID);
    if (!isPlaying) return message.reply('❌ There is no track currently playing!');

    // Pause the track and send message.
    let song = await client.player.pause(guildID);
    message.channel.send('paused');
  }
};