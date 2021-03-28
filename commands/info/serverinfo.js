// Return the command.
module.exports = {
  name: 'serverinfo',
  description: 'Displays information about the server.',
  aliases: ['servinfo', 'sinfo', 'sinf'],
  args: false,
  execute(client, message) {
    const embed = new client.Discord.MessageEmbed();
    const guild = message.guild;
    const region = {
      'brazil': ':flag_br Brazil',
      'eu-central': ':flag_eu: Central Europe',
      'singapore': ':flag_sg: Singapore',
      'us-central': ':flag_us: U.S. Central',
      'sydney': ':flag_au: Sydney',
      'us-east': ':flag_us: U.S. East',
      'us-south': ':flag_us: U.S. South',
      'us-west': ':flag_us: U.S. West',
      'eu-west': ':flag_eu: Western Europe',
      'vip-us-east': ':flag_us: VIP U.S. East',
      'london': ':flag_gb: London',
      'amsterdam': ':flag_nl: Amsterdam',
      'hongkong': ':flag_hk: Hong Kong',
      'russia': ':flag_ru: Russia',
      'southafrica': ':flag_za:  South Africa'
    }

    if (!guild || !guild.available) return message.reply(client.messages[language].messages.error.guild_command);

    embed.setAuthor(message.author.username)
      .setColor(client.config.colors.embed)
      .setDescription('Information about the server.')
      .addFields(
        { name: '¬ Name', value: guild.name, inline: true },
        { name: '¬ ID', value: guild.id, inline: true },
        { name: '¬ Owner', value: `${guild.owner.user.username}#${guild.owner.user.discriminator}`, inline: true }
      )
      .addFields(
        //{ name: '¬ Region', value: region[guild.region], inline: true },
        { name: '¬ Region', value: guild.region, inline: true },
        { name: '¬ Channels', value: guild.channels.size, inline: true },
        { name: '¬ Roles', value: guild.roles.size, inline: true }
      )
      .setTimestamp();

    message.channel.send(embed);
  }
};
