// Return the command.
module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel the bot is connected to.',
  aliases: ['lvc', 'lc', 'l'],
  args: false,
  async execute(client, message) {
    // Leave voice channel & send message.
    let userVoiceChannel = message.member.voice.channel;
    userVoiceChannel.leave();

    message.channel.send(
      `${client.emotes.success} Successfully disconnected from \`${userVoiceChannel.name}\``,
    );
  },
};
