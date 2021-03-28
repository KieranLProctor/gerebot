// Return the command
module.exports = {
  name: 'shuffle',
  description: 'Shuffles all of the tracks in queue.',
  aliases: ['sffle', 'shf', 'sh'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    // Check if user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can shuffle the queue!');

    // Check if there is anything in the queue.
    let queue = await client.player.getQueue(guildID);
    if (queue.songs.length < 3) return message.reply(`❌ There aren't enough tracks in the queue to shuffle!`);

    // Shuffle the queue.
    let song = await client.player.shuffle(guildID);
    message.channel.send('shuffled');
  }
};