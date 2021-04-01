// Return the command.
module.exports = {
  name: 'resume',
  description: 'Resumes the track currently playing.',
  aliases: ['res'],
  args: false,
  execute(client, message) {
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) {
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to resume the track!`,
      );
    }

    const clientVoiceChannel = message.guild.me.voice.channel;
    if (clientVoiceChannel && userVoiceChannel.id !== clientVoiceChannel.id) {
      return message.reply(
        `${client.emotes.error} We must be in the same voice channel to resume the track!`,
      );
    }

    const isPlaying = client.player.getQueue(message);
    if(!isPlaying) {
      return message.reply(`${client.emotes.error} No track to resume!`);
    }

    if(!isPlaying.paused) {
      return message.reply(`${client.emotes.error} The track is already playing!`);
    }

    const wasSuccessful = client.player.resume(message);
    if (!wasSuccessful) {
      client.logger.log('error', 'Unable to resume music.');

      return message.reply(
        `${client.emotes.error} The track is already playing!`,
      );
    }

    message.channel.send(
      `${client.emotes.success} The music has resumed playing!`,
    );
  },
};
