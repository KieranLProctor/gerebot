// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');
require('dotenv').config();

module.exports = {
  name: "join",
  description: "Joins the voice channel you are connected to.",
  aliases: ["j", "jv", "jvc"],
  args: false,
  execute(message) {
    let embed = new Discord.MessageEmbed();

    if (!message.member.voice.channel) return message.reply(`You must be in a voice channel for me to join!`);

    message.member.voice.channel.join()
      .then(connection => {
        console.log(connection.channel);

        embed.setAuthor(message.author.username)
          .setColor(config.colors.embed)
          .setDescription('Successfully joined the voice channel.')
          .addField('¬ Name', connection.channel.name, true)
          .addField('¬ Limit', connection.channel.userLimit, true)
          .addField('¬ Bitrate', connection.channel.bitrate, true)
          .addField('¬ Users', connection.channel.members.size - 1, true)
          .setTimestamp();

        message.channel.send(embed);

        message.member.voice.channel.leave()
      })
      .catch(err => {
        message.channel.send(`❌ Error joining \`${message.member.voice.channel.name}\``);
      });
  }
};