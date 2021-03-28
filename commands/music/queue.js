// Dependencies.
const Discord = require('discord.js');
const config = require('../../configs/config.json');
const moment = require('moment');

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
      .setDescription(`[Queue for ${userVoiceChannel.name}](www.kieranproctor.com)`)
      .setTimestamp();

    queue.songs.forEach((song, i) => {
      embed.addField(`${i == 0 ? '__Currently Playing:__\n' : `__Playing Next:__\n\`${i}.\``} [${song.name}](${song.url}) | \`${moment(song.duration / 60).format('hh:mm:ss')} Requested By: ${song.requestedBy}\``);
    });

    message.channel.send(embed);
  }
};