module.exports = (client, message, queue, track) => {
  const embed = new client.Discord.MessageEmbed();
  embed
    .setAuthor(message.author.username)
    .setColor(client.config.colors.embed)
    .setTitle('Added To Queue')
    .setDescription(`[${track.title}](${track.url})`)
    .setThumbnail(track.thumbnail)
    .addFields(
      {
        name: '¬ Playing In',
        value: message.member.voice.channel,
        inline: true,
      },
      { name: '¬ Duration', value: track.duration, inline: true },
      { name: '¬ Channel', value: track.author, inline: true },
      { name: '¬ Requester', value: message.author.username, inline: true },
      {
        name: '¬ Listeners',
        value: message.member.voice.channel.members.size - 1,
        inline: true,
      },
      { name: '¬ Views', value: track.views, inline: true },
    )
    .setTimestamp();

  message.channel.send(embed);
};
