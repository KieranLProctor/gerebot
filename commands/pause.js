// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'pause',
  description: 'Pauses the currently playing track.',
  aliases: ['pse'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel to repeat the currently playing track!');

    let playing = client.player.isPlaying(guildID);
    if (!playing) return message.reply('❌ There is no track currently playing!');

    let song = await client.player.pause(guildID);
    message.channel.send('paused');
  }
};