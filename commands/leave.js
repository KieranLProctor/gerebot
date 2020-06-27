// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel the bot is connected to.',
  aliases: ['lvc', 'lc', 'l'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;
    //let clientChannel = client.bot.;

    // Check if currently playing anything.
    let isPlaying = await client.player.isPlaying(guildID);
    if (isPlaying) client.player.stop(guildID);

    // Leave voice channel and send message.
    let userVoiceChannel = message.member.voice.channel;
    userVoiceChannel.leave();

    message.channel.send(`✔ Successfully disconnected from \`${userVoiceChannel.name}\``);
  }
};