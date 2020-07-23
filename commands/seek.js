// Dependencies.
const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = {
  name: 'seek',
  description: 'Seeks to the specific posisition in the track currently playing.',
  aliases: ['sek'],
  usage: '<position>',
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can skip the track currently playing!');

    let isPlaying = client.player.isPlaying(guildID);
    if (!isPlaying) return message.reply(`❌ There isn't a track currently playing!`);

    if (isNaN(args[0])) return message.reply('❌ You must enter a valid number to seek to!');

    let track = await client.player.nowPlaying(guildID);
    if(args[0] < 0 || args[0] > track.duration) return message.send(`❌ You must enter a value between 0-${track.duration} to seek to!`);

    let song = await client.player.play(userVoiceChannel, track, message.member.user.tag);

    message.channel.send(`seeked to ${args[0]}`);
  }
};