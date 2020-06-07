// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');
require('dotenv').config();

module.exports = {
  name: 'join',
  description: 'Joins the voice channel you are connected to.',
  aliases: ['j', 'jv', 'jvc'],
  args: false,
  execute(message) {
    const embed = new Discord.MessageEmbed();
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.reply(`You must be in a voice channel for me to join!`);

    voiceChannel.join()
      .then(connection => {
        console.log(connection.channel);

        embed.setAuthor(message.author.username)
          .setColor(config.colors.embed)
          .setDescription('Successfully joined the voice channel.')
          .addField('¬ Name', connection.channel.name, true)
          .addFields(
            { name: '¬ Name', value: connection.channel.name, inline: true },
            { name: '¬ Bitrate', value: connection.channel.bitrate, inline: true },
            { name: '¬ Limit', value: connection.channel.userLimit, inline: true }
          )
          .addField('¬ Users', connection.channel.members.size - 1, true)
          .setTimestamp();

        message.channel.send(embed);

        voiceChannel.leave()
      })
      .catch(err => {
        message.channel.send(`❌ Error joining \`${voiceChannel.name}\``);
      });
  }
};