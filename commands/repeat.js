// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'repeat',
  description: 'Toggles the repeating of the currently playing track.',
  aliases: ['loop', 'rep', 'rpt'],
  args: false,
  execute(client, message) {
    const voiceChannel = message.member.voice.channel;
    const guildID = message.guild.id;

    if (!voiceChannel) return message.reply('❌ You must be in a voice channel to repeat the currently playing track!');

    client.player.setRepeatMode(guildID, true);

    message.channel.send('repeating');
  }
};