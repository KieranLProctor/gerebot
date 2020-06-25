// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'shuffle',
  description: 'Shuffles all of the tracks in queue.',
  aliases: ['sffle', 'shf', 'sh'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can shuffle the queue!');

    let song = await client.player.shuffle(guildID);
    message.channel.send('skipped');
  }
};