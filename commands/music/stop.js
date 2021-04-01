// Return the command.
module.exports = {
  name: 'stop',
  description: 'Stops playing music altogether.',
  aliases: ['stp', 'spm', 'sp'],
  args: false,
  execute(client, message) {
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to stop the track!`,
      );

    const clientVoiceChannel = message.guild.me.voice.channel;
    if (clientVoiceChannel && userVoiceChannel.id !== clientVoiceChannel.id)
      return message.reply(
        `${client.emotes.error} We must be in the same voice channel to stop the track!`,
      );

    client.player.setRepeatMode(message, false);
    const wasSuccessful = client.player.stop(message);
    if (!wasSuccessful) {
      client.logger.log('error', 'Unable to stop music.');

      return message.reply(`${client.emotes.error} Unable to stop the track!`);
    }

    message.channel.send(
      `${client.emotes.success} The track has now stopped!`,
    );
  },
};
