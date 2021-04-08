// Return the command.
module.exports = {
  name: 'loop',
  description: 'Loops the track currently playing.',
  aliases: ['repeat', 'rpt', 'l'],
  args: false,
  async execute(client, message) {
    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel before I can loop the track currently playing!`,
      );

    // Check if currently playing anything.
    let isPlaying = await client.player.isPlaying(guildID);
    if (!isPlaying)
      return message.reply(
        `${client.emotes.error} I'm not currently playing anything!`,
      );

    // Set to repeat the track and send message.
    client.player.setRepeatMode(message, true);
    message.channel.send('looping');
  },
};
