// Return the command.
module.exports = {
  name: 'seek',
  description:
    'Seeks to the specific posisition in the track currently playing.',
  aliases: ['sek'],
  usage: '<position>',
  args: true,
  execute(client, message, args) {
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel before I can skip the track currently playing!`,
      );

    const isPlaying = client.player.isPlaying(message);
    if (!isPlaying)
      return message.reply(
        `${client.emotes.error} There isn't a track currently playing!`,
      );

    if (isNaN(args[0]))
      return message.reply(
        `${client.emotes.error} You must enter a valid number to seek to!`,
      );

    const track = client.player.nowPlaying(message);
    if (args[0] < 0 || args[0] > track.duration)
      return message.send(
        `${client.emotes.error} You must enter a value between 0-${track.duration} to seek to!`,
      );

    const wasSuccessful = client.player.play(message, track);
    if(!wasSuccessful) {
      client.logger.log('error', 'Unable to seek.');

      return client.message.reply(`${client.emotes.error} Unable to seek to requested position!`);
    }

    message.channel.send(`seeked to ${args[0]}`);
  },
};
