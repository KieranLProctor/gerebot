// Return the command.
module.exports = {
  name: 'move',
  description: 'Moves the bot to the specified voice channel.',
  aliases: ['mv'],
  usage: '<voicechannel>',
  args: true,
  execute(client, message, args) {
    const newVoiceChannel = message.guild.channels.get(args[0]);

    const wasSuccessful = client.player.moveTo();
    if (!wasSuccessful) {
      client.logger.log('error', 'Unable to move to new voice channel.');

      return client.message.reply(
        `${client.emotes.error} Unable to move the bot to that voice channel`,
      );
    }
  },
};
