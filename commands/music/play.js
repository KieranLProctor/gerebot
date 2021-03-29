// Return the command.
module.exports = {
  name: 'play',
  description:
    'Plays Youtube videos to the voice channel you are connected to.',
  aliases: ['pyt', 'pm', 'p'],
  usage: '<query|link>',
  args: true,
  execute(client, message, args) {
    // Check if the user is in a voice channel.
    const userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel before I can play!`,
      );

    const toPlay = args.toString().replace(/,/g, ' ');
    client.player.play(message, toPlay, { firstResult: true });
  },
};
