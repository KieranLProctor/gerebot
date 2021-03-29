// Return the command.
module.exports = {
  name: 'pause',
  description: 'Pauses the track currently playing.',
  aliases: ['pse'],
  args: false,
  async execute(client, message) {
    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply(`${client.emotes.error} You must be in a voice channel to repeat the track currently playing!`);

    // Check if currently playing anything.
    let isPlaying = client.player.isPlaying(guildID);
    if (!isPlaying) return message.reply(`${client.emotes.error} There is no track currently playing!`);

    // Pause the track and send message.
    let wasSuccessful = client.player.pause(message);
    if(!wasSuccessful) {
      client.logger.log('error', 'Unable to pause music.');

      return message.reply(`${client.emotes.error} - Unable to pause music!`);
    }
    
    message.channel.send(`${client.emotes.success} - Music has been paused!`);
  }
};