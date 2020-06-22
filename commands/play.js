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

      // embed.setAuthor(message.author.username)
      //   .setColor(config.colors.embed)
      //   .setDescription(`[${track.name}](${track.url})`)
      //   .addField('¬ Playing in', voiceChannel.name, true)
      //   .addFields(
      //     { name: '¬ Duration', value: moment(track.duration).format('HH:mm:ss'), inline: true },
      //     { name: '¬ Channel', value: track.author, inline: true },
      //     { name: '¬ Requester', value: track.requestedBy, inline: true }
      //   )
      //   .addField('¬ Users', 1, true)
      //   .setTimestamp();

      message.channel.send('added to queue');
    } else {
      let song = await client.player.play(userVoiceChannel, toPlay, message.member.user.tag);

      message.channel.send('playing');

      song.queue.on('end', () => {
        message.channel.send('finished');
      });

      song.queue.on('songChanged', (oldSong, newSong, skipped, repeatMode) => {
        if (repeatMode) {
          message.channel.send('repeat');
        } else {
          message.channel.send('play');
        }
      });
    }
  }
};