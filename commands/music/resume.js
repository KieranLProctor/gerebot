// Dependencies.
const Discord = require('discord.js');
const config = require('../../configs/config.json');

module.exports = {
  name: 'resume',
  description: 'Resumes the track currently playing.',
  aliases: ['res'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to resume the track currently playing!');

    let song = await client.player.resume(guildID);
    if (!song) return message.reply('❌ The track is already playing!');

    message.channel.send('resume');
  }
};