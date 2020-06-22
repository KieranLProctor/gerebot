// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'join',
  description: 'Joins the voice channel you are connected to.',
  aliases: ['jvc', 'jv', 'j'],
  args: false,
  execute(client, message) {
    const embed = new Discord.MessageEmbed();

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply(`You must be in a voice channel for me to join!`);

    userVoiceChannel.join()
      .then(connection => {
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
      })
      .catch(error => {
        console.log(error);

        message.channel.send(`❌ Error joining \`${userVoiceChannel.name}\``);
      });
  }
};