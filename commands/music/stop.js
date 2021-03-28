// Return the command.
module.exports = {
  name: 'stop',
  description: 'Stops playing music altogether.',
  aliases: ['stp', 'spm', 'sp'],
  args: false,
  async execute(client, message) {
    const guildID = message.guild.id;

    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel) return message.reply('❌ You must be in a voice channel before I can stop playing altogether!');

    let song = await client.player.stop(guildID);
    message.channel.send('stopped');
  }
};