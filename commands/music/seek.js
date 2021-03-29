// Return the command.
module.exports = {
  name: 'seek',
  description:
    'Seeks to the specific posisition in the track currently playing.',
  aliases: ['sek'],
  usage: '<position>',
  args: false,
  async execute(client, message) {
    let userVoiceChannel = message.member.voice.channel
    if (!userVoiceChannel)
      return message.reply(
        `${client.emotes.error} You must be in a voice channel before I can skip the track currently playing!`,
      )

    let isPlaying = client.player.isPlaying(message)
    if (!isPlaying)
      return message.reply(
        `${client.emotes.error} There isn't a track currently playing!`,
      )

    if (isNaN(args[0]))
      return message.reply(
        `${client.emotes.error} You must enter a valid number to seek to!`,
      )

    let track = await client.player.nowPlaying(guildID)
    if (args[0] < 0 || args[0] > track.duration)
      return message.send(
        `${client.emotes.error} You must enter a value between 0-${track.duration} to seek to!`,
      )

    let song = await client.player.play(message, track)

    message.channel.send(`seeked to ${args[0]}`)
  },
}
