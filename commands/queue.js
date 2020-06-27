// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'queue',
  description: 'Displays all of the tracks in the play queue.',
  aliases: ['q'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;
    const embed = new Discord.MessageEmbed();

    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to see the queue!');

    // Check if there is anything in the queue.
    let queue = await client.player.getQueue(guildID);
    if (!queue) return message.reply(`❌ There isn't anything in the queue!`);

    embed.setAuthor(message.author.username)
      .setColor(config.colors.embed)
      .setDescription(`Queue for ${userVoiceChannel.name}`)
      .setTimestamp();

    queue.songs.forEach((song, i) => {
      if (i == 0) {
        embed.addField(`Currently Playing:\n${song.name} - ${song.author}`);
      } else {
        if (i == 1) {
          embed.addField(`Playing Next:\n${song.name} - ${song.author}`);
        } else {
          embed.addField(`${song.name} - ${song.author}`);
        }
      }
    });

    // let i = queue.songs.map((song, j) => {
    //   return `${j === 0 ? 'Current' : `${j + 1}`}- ${song.name} : ${song.author}`;
    // }).join('\n');

    message.channel.send(embed);
  }
};