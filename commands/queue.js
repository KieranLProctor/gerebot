// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'queue',
  description: 'Displays all of the tracks in the play queue.',
  aliases: ['q'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.reply('❌ You must be in a voice channel to see the queue!');

    let queue = await client.player.getQueue(guildID);
    if(!queue) return message.reply(`❌ There isn't anything in the queue!`);

    let i = queue.songs.map((song, j) => {
      return `${j === 0 ? 'Current' : `${j+1}`}- ${song.name} : ${song.author}`;
    }).join('\n');
    message.channel.send(i);
  }
};