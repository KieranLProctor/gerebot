// Return the command
module.exports = {
  name: 'shuffle',
  description: 'Shuffles all of the tracks in queue.',
  aliases: ['sffle', 'shf', 'sh'],
  args: false,
  async execute(client, message) {
    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel before I can shuffle the queue!`,
      );

    // Check if there is anything in the queue.
    let queue = await client.player.getQueue(message);
    if (queue.songs.length < 3)
      return message.reply(
        `${client.emotes.error} There aren't enough tracks in the queue to shuffle!`,
      );

    // Shuffle the queue.
    let song = await client.player.shuffle(message);
    message.channel.send('shuffled');
  },
};
