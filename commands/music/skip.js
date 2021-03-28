// Return the command.
module.exports = {
  name: 'skip',
  description: 'Skips the track currently playing.',
  aliases: ['skp', 'st', 's'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can skip the track currently playing!');

    let song = await client.player.skip(guildID);
    message.channel.send('skipped');
  }
};