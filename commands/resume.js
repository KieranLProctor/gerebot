// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'resume',
  description: 'Resumes the track currently playing.',
  aliases: ['res'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel to resume the track currently playing!');

    let song = await client.player.resume(guildID);
    if (!song) return message.reply('❌ The track is already playing!');

    message.channel.send('resume');
  }
};