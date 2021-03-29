// Return the command.
module.exports = {
  name: "stop",
  description: "Stops playing music altogether.",
  aliases: ["stp", "spm", "sp"],
  args: false,
  async execute(client, message) {
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel to make me stop playing!`
      );

    let clientVoiceChannel = message.guild.me.voice.channel;
    if (clientVoiceChannel && userVoiceChannel.id !== clientVoiceChannel.id)
      return message.reply(
        `${client.emotes.error} - You are not in the same voice channel !`
      );

    client.player.setRepeatMode(message, false);
    let wasSuccessful = client.player.stop(message);
    if (!wasSuccessful) {
      client.logger.log("error", 'Unable to stop music.');

      return message.reply(`${client.emotes.error} - An error occurred.`);
    }

    message.channel.send(`${client.emotes.success} - The music has now stopped!`);
  },
};
