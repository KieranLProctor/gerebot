// Return the command.
module.exports = {
  name: "play",
  description:
    "Plays Youtube videos to the voice channel you are connected to.",
  aliases: ["pyt", "pm", "p"],
  usage: "<query|link>",
  args: true,
  async execute(client, message, args) {
    const embed = new Discord.MessageEmbed();
    const guildID = message.guild.id;
    const toPlay = args.toString().replace(/,/g, " ");

    // Check if the user is in a voice channel.
    let userVoiceChannel = message.member.voice.channel;
    if (!userVoiceChannel)
      return message.reply(
        "❌ You must be in a voice channel before I can play!"
      );

    // Check if currently playing anything if so => add to the queue.
    let isPlaying = client.player.isPlaying(guildID);
    if (isPlaying) {
      let song = await client.player.addToQueue(
        guildID,
        toPlay,
        message.member.user.tag
      );

      embed
        .setAuthor(message.author.username)
        .setColor(client.config.colors.embed)
        .setDescription(`[${song.name}](${song.url})`)
        .addField("¬ Playing in", userVoiceChannel.name, true)
        .addFields(
          { name: "¬ Duration", value: song.duration, inline: true },
          { name: "¬ Channel", value: song.author, inline: true },
          { name: "¬ Requester", value: song.requestedBy, inline: true }
        )
        .addField("¬ Users Listening", 1, true)
        .setTimestamp();

      message.channel.send(embed);
    } else {
      //client.player.play(message, toPlay, true);

      client.player.play(message, "Despacito", true);

      // embed.setAuthor(message.author.username)
      //   .setColor(config.colors.embed)
      //   .setDescription(`[${song.name}](${song.url})`)
      //   .addField('¬ Playing in', userVoiceChannel.name, true)
      //   .addFields(
      //     { name: '¬ Duration', value: song.duration, inline: true },
      //     { name: '¬ Channel Name', value: song.author, inline: true },
      //     { name: '¬ Requested By', value: song.requestedBy, inline: true }
      //   )
      //   .addField('¬ Users Listening', 1, true)
      //   .setTimestamp();

      // message.channel.send(embed);

      // song.queue.on('end', () => {
      //   message.channel.send('no more songs in the queue.');
      // });
    }
  },
};
