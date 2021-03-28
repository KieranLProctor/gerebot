// Dependencies.
const Discord = require('discord.js');
const config = require('../../configs/config.json');

module.exports = {
  name: 'volume',
  description: 'Changes the volume on the currently playing track.',
  aliases: ['vlme', 'vol', 'v'],
  usage: '<number>',
  args: true,
  execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel before I can change the volume on the currently playing track!');

    if (isNaN(args[0])) return message.reply('❌ You must enter a valid number between 0-100 to change the volume!');

    if (args[0] < 0 || args[0] > 100) return message.reply('❌ You must enter a valid number between 0-100 to change the volume!');

    // Change the volume and send message.
    client.player.setVolume(guildID, args[0]);
    message.channel.send(`volume changed to ${args[0]}`);
  }
};