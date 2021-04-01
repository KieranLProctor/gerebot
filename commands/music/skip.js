// Return the command.
module.exports = {
  name: 'skip',
  description: 'Skips the track currently playing.',
  aliases: ['skp', 'st', 's'],
  args: false,
  execute(client, message) {
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) {
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to skip the track!`,
      );
    }

    const clientVoiceChannel = message.guild.me.voice.channel;
    if (clientVoiceChannel && userVoiceChannel.id !== clientVoiceChannel.id) {
      return message.reply(
        `${client.emotes.error} We must be in the same voice channel to skip the track!`,
      );
    }

    const wasSuccessful = client.player.skip(message);
    if (!wasSuccessful) {
      client.logger.log('error', 'Unable to skip.');

      return message.reply(`${client.emotes.error} Unable to skip!`);
    }

    message.channel.send(`${client.emotes.success} Skipped track!`);
  },
};
