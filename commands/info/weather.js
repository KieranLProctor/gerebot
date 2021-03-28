// Return the command.
module.exports = {
  name: 'weather',
  description:
    'Displays information about the weather in a specified location.',
  aliases: ['wthr', 'winf', 'winfo', 'forecast'],
  usage: '<location>',
  args: true,
  execute(client, message, args) {
    const getWeather = async args => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${args}.json?access_token=${client.env.parsed.MAPBOX_TOKEN}`;

      client.axios
        .get(url)
        .then(response => {
          const lat = response.data.features[1].center[1];
          const long = response.data.features[1].center[0];

          return getWeatherData(lat, long);
        })
        .catch(error => client.logger.log('error', error));
    };

    const getWeatherData = (lat, long) => {
      const url = `https://api.darksky.net/forecast/${client.env.parsed.DARKSKY_TOKEN}/${lat},${long}?units=si`;

      axios.get(url).then(response => {
        const embed = new client.Discord.MessageEmbed();
        const currentData = response.data.currently;

        embed.setAuthor(message.author.username)
          .setColor(client.config.colors.embed)
          .setDescription(`Weather information for ${args}.`)
          .addFields(
            { name: '¬ Summary', value: currentData.summary, inline: true },
            { name: '¬ Pressure', value: currentData.pressure, inline: true },
            { name: '¬ Precipitation', value: `${currentData.precipProbability}%`, inline: true }
          )
          .addFields(
            { name: '¬ Temperature', value: `${currentData.temperature}°C`, inline: true },
            { name: '¬ Dewpoint', value: `${currentData.dewPoint}°C`, inline: true },
            { name: '¬ Humidity', value: `${currentData.humidity}%`, inline: true }
          )
          .addFields(
            { name: '¬ Wind', value: `${currentData.windBearing}°/${currentData.windSpeed}kts`, inline: true },
            { name: '¬ Visibility', value: currentData.visibility, inline: true },
            { name: '¬ UV Index', value: currentData.uvIndex, inline: true }
          )
          .addField(map)
          .setTimestamp();

        message.channel.send(embed);
      }).catch(error => client.logger.log('eror', error));
    }

    getWeather(args);
  }
};
