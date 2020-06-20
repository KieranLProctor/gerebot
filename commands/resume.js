// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'resume',
  description: 'Resumes the currently playing track.',
  aliases: ['res'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel to resume the currently playing track!');

    let playing = client.player.isPlaying(guildID);
    if (playing) return message.reply('❌ The track is already playing!');

    let song = await client.player.resume(guildID);
    message.channel.send('resume');
  }
};