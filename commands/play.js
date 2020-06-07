// Dependencies.
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const config = require('../config.json');
require('dotenv').config();

module.exports = {
  name: 'play',
  description: 'Plays Youtube videos to the voice channel you are connected to.',
  aliases: ['p', 'pyt', 'pm'],
  usage: '<link>',
  args: true,
  execute(message, args) {
    const embed = new Discord.MessageEmbed();
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.reply('You must be in a voice channel before I can play!');

    const joinVoiceChannel = args => {
      voiceChannel.join()
        .then(async connection => {
          let video = await searchYouTubeAsync(args);
          let url = video.items[0].link;

          console.log(video.items[0]);

          // if(video.items.length > 1) {
          //   let result = await selectYouTubeSearchResult(video);

          //   url = result.link;
          // }

          const stream = ytdl(url, { filter: 'audioonly' });
          const dispatcher = connection.play(stream);

          embed.setAuthor(message.author.username)
            .setColor(config.colors.embed)
            .setDescription(`[${video.items[0].title}](${video.items[0].link})`)
            .addField('¬ Name', connection.channel.name, true)
            .addFields(
              { name: '¬ Duration', value: video.items[0].duration, inline: true },
              { name: '¬ Live', value: video.items[0].live, inline: true },
              { name: '¬ Channel', value: video.items[0].author.name, inline: true }
            )
            .addField('¬ Users', connection.channel.members.size - 1, true)
            .setTimestamp();

          message.channel.send(embed);

          dispatcher.on('end', () => voiceChannel.leave());
        })
        .catch(err => {
          console.log(err);
          message.channel.send(`❌ Error joining \`${voiceChannel.name}\``);
        });
    }

    const searchYouTubeAsync = async args => {
      let video = await ytsr(args.toString().replace(/,/g, ' '));

      return video;
    }

    const selectYouTubeSearchResult = async args => {

    }

    joinVoiceChannel(args);
  }
};