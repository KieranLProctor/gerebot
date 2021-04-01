// Return the command.
module.exports = {
  name: 'pause',
  description: 'Pauses the track currently playing.',
  aliases: ['pse'],
  args: false,
  execute(client, message) {
    // Check if user is in a voice channel.
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to pause the track!`,
      );

    // Check if user and client are in the same voice channel.
    const clientVoiceChannel = message.guild.me.voice.channel;
    if (clientVoiceChannel && userVoiceChannel.id !== clientVoiceChannel.id) {
      return message.reply(
        `${client.emotes.error} We must be in the same voice channel to pause the track!`,
      );
    }

    // Check if currently playing.
    const isPlaying = client.player.getQueue(message);
    if (!isPlaying) {
      return message.reply(
        `${client.emotes.error} There is no track currently playing!`,
      );
    }

    // Check if already paused.
    if (isPlaying.paused) {
      return message.reply(
        `${client.emotes.error} The track is already paused!`,
      );
    }

    // Pause the track and send message.
    const wasSuccessful = client.player.pause(message);
    if (!wasSuccessful) {
      client.logger.log('error', 'Unable to pause music.');

      return message.reply(`${client.emotes.error} Unable to pause music!`);
    }

    message.channel.send(`${client.emotes.success} Music has been paused!`);
  },
};
