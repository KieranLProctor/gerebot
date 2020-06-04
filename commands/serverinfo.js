// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');
require('dotenv').config();

module.exports = {
  name: "serverinfo",
  description: "Displays information about the server.",
  aliases: ["servinfo", "sinfo", "sinf"],
  args: false,
  execute(message) {
    let embed = new Discord.RichEmbed();
    let region = {
      "brazil": ":flag_br Brazil",
      "eu-central": ":flag_eu: Central Europe",
      "singapore": ":flag_sg: Singapore",
      "us-central": ":flag_us: U.S. Central",
      "sydney": ":flag_au: Sydney",
      "us-east": ":flag_us: U.S. East",
      "us-south": ":flag_us: U.S. South",
      "us-west": ":flag_us: U.S. West",
      "eu-west": ":flag_eu: Western Europe",
      "vip-us-east": ":flag_us: VIP U.S. East",
      "london": ":flag_gb: London",
      "amsterdam": ":flag_nl: Amsterdam",
      "hongkong": ":flag_hk: Hong Kong",
      "russia": ":flag_ru: Russia",
      "southafrica": ":flag_za:  South Africa"
    }

    let guild = message.guild;
    
    if (!guild || !guild.avilable) return message.reply(`This guild isn't available for data retrieval.`);

    embed.setAuthor(message.author.username)
      .setColor(config.colors.embed)
      .setDescription('Information about the server.')
      .addField('¬ Name', message.guild.name, true)
      .addField('¬ ID', message.guild.id, true)
      .addField('¬ Owner', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
      .addField('¬ Region', region[message.guild.region], true)
      .addField('¬ Channels', message.guild.channels.size, true)
      .addField('¬ Roles', message.guild.roles.size, true)
      .setTimestamp();

    message.channel.send(embed);
  }
};
