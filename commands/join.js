// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();
const embedColor = process.env.EMBED_COLOR;

module.exports = {
  name: "join",
  description: "Joins the voice channel you are connected to.",
  aliases: ["j", "jv", "jvc"],
  args: false,
  execute(message) {
    let embed = new Discord.RichEmbed();

    if (!message.member.voiceChannel) return message.reply(`You must be in a voice channel for me to join!`);

    message.member.voiceChannel.join()
      .then(connection => {
        console.log(connection.channel.members.size);

        embed.setAuthor(message.author.username)
          .setColor(embedColor)
          .setDescription('Successfully joined the voice channel.')
          .addField('¬ Name', connection.channel.name, true)
          .addField('¬ Limit', connection.channel.userLimit, true)
          .addField('¬ Bitrate', connection.channel.bitrate, true)
          .addField('¬ Users', connection.channel.members.size - 1, true)
          .setTimestamp();

        message.channel.send(embed);

        message.member.voiceChannel.leave()
      })
      .catch(err => {
        message.channel.send(`❌ Error joining \`${message.member.voiceChannel.name}\``);
      });
  }
};