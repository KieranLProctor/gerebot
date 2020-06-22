// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'clear',
  description: 'Removes all tracks from the queue.',
  aliases: ['clrq', 'clr', 'cq'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to clear the queue!');

    let queue = client.player.getQueue(guildID);
    if (!queue) return message.channel.send(`❌ No tracks in the queue to clear!`);

    // Clear the queue and send message.
    client.player.clearQueue(guildID);
    message.channel.send(`✔ All tracks have been removed from the queue!`);
  }
};