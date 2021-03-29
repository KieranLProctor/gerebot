// Return the command.
module.exports = {
  name: "resume",
  description: "Resumes the track currently playing.",
  aliases: ["res"],
  args: false,
  async execute(client, message) {
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        "❌ You must be in a voice channel to resume the track currently playing!"
      );

    let wasSuccessful = client.player.resume(message);
    if (!wasSuccessful) {
      client.logger.log("error", "Unable to resume music.");

      return message.reply(
        `${client.emotes.error} The track is already playing!`
      );
    }

    message.channel.send(`${client.emotes.success} - The music has resumed playing!`);
  },
};
