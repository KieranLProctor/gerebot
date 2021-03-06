// Return the command.
module.exports = {
  name: 'clear',
  description: 'Removes all tracks from the queue.',
  aliases: ['clrq', 'clr', 'cq'],
  args: false,
  execute(client, message) {
    // Check if user is in a voice channel.
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to clear the queue!`,
      );

    // Check if currently playing.
    const queue = client.player.getQueue(message);
    if (!queue)
      return message.channel.send(
        `${client.emotes.error} No tracks in the queue to clear!`,
      );

    // Clear the queue and send message.
    client.player
      .clearQueue(message)
      .then(() => {
        message.channel.send(
          `${client.emotes.success} All tracks have been removed from the queue!`,
        );
      })
      .catch((error) => {
        client.logger.log('error', error);
      });
  },
};
