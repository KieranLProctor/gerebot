// Dependencies.
const Discord = require('discord.js');
const config = require('../configs/config.json');

module.exports = {
  name: 'remove',
  description: 'Removes the specified track from the queue.',
  aliases: ['rem', 'rmv'],
  usage: '<position>',
  args: true,
  async execute(client, message) {
    const guildID = message.guild.id;
    const queue = await client.player.getQueue(guildID);

    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can remove a track from the queue!');

    // Check if the argument is a valid number.
    if (isNaN(args[0])) return message.reply('❌ You must enter a valid number to remove a track!');

    // Check if the argument is in the queue.
    if(args[0] > queue.songs.length) return message.reply(`❌ There isn't a track in position ${args[0]} in the queue!`);

    // Check if there is anything in the queue.
    if (queue.songs.length == 1) return message.reply(`❌ You can't remove the track currently playing from the queue!`);

    // Remove the track from the queue and send message.
    client.player.remove(guildID, args[0]).then(response => {
      message.channel.send('Removed song!');
    }).catch(error => {
      message.channel.send(`❌ Error removing the track from the queue!`);
    });
  }
};