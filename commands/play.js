// Dependencies.
const Discord = require('discord.js');
const config = require('../config.json');
const moment = require('moment');

module.exports = {
  name: 'play',
  description: 'Plays Youtube videos to the voice channel you are connected to.',
  aliases: ['pyt', 'pm', 'p'],
  usage: '<query|link>',
  args: true,
  async execute(client, message, args) {
    const embed = new Discord.MessageEmbed();
    const guildID = message.guild.id;
    const toPlay = args.toString().replace(/,/g, ' ');

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can play!');

    // If already playing => add song to the queue.
    let isPlaying = client.player.isPlaying(guildID);
    if (isPlaying) {
      let song = await client.player.addToQueue(guildID, toPlay, message.member.user.tag);

      embed.setAuthor(message.author.username)
        .setColor(config.colors.embed)
        .setDescription(`[${song.name}](${song.url})`)
        .addField('¬ Playing in', userVoiceChannel.name, true)
        .addFields(
          { name: '¬ Duration', value: moment(song.duration).format('HH:mm:ss'), inline: true },
          { name: '¬ Channel', value: song.author, inline: true },
          { name: '¬ Requester', value: song.requestedBy, inline: true }
        )
        .addField('¬ Users Listening', 1, true)
        .setTimestamp();

      message.channel.send(embed);
    } else {
      let song = await client.player.play(userVoiceChannel, toPlay, message.member.user.tag);

      embed.setAuthor(message.author.username)
        .setColor(config.colors.embed)
        .setDescription(`[${song.name}](${song.url})`)
        .addField('¬ Playing in', userVoiceChannel.name, true)
        .addFields(
          { name: '¬ Duration', value: moment(song.duration).format('HH:mm:ss'), inline: true },
          { name: '¬ Channel Name', value: song.author, inline: true },
          { name: '¬ Requested By', value: song.requestedBy, inline: true }
        )
        .addField('¬ Users Listening', 1, true)
        .setTimestamp();

      message.channel.send(embed);

      song.queue.on('end', () => {
        message.channel.send('no more songs in the queue.');
      });

      // song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
      //   if (repeatMode) {
      //     message.channel.send('repeat');
      //   } else {
      //     message.channel.send('play');
      //   }
      // });
    }
  }
};