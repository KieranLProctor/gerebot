// Return the command.
module.exports = {
  name: 'clear',
  description: 'Removes all tracks from the queue.',
  aliases: ['clrq', 'clr', 'cq'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel to clear the queue!');

    // Check if there is a queue to clear.
    let queue = await client.player.getQueue(guildID);
    if (!queue) return message.channel.send(`❌ No tracks in the queue to clear!`);

    // Clear the queue and send message.
    client.player.clearQueue(guildID).then(response => {
      message.channel.send(`✔ All tracks have been removed from the queue!`);
    }).catch(error => {
      client.logger.log('error', error);
    });
  }
};