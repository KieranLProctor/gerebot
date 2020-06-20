// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'stop',
  description: 'Stops playing music altogether.',
  aliases: ['stp', 'spm', 'sp'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel before I can stop playing altogether!');

    let song = await client.player.stop(guildID);
    message.channel.send('stopped');
  }
};