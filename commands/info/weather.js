// Dependencies.
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../../configs/config.json');
require('dotenv').config();
const mapboxToken = process.env.MAPBOX_TOKEN;
const darkskyToken = process.env.DARKSKY_TOKEN;

module.exports = {
  name: 'weather',
  description:
    'Displays information about the weather in a specified location.',
  aliases: ['wthr', 'winf', 'winfo', 'forecast'],
  usage: '<location>',
  args: true,
  execute(client, message, args) {
    const getWeather = async args => {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${args}.json?access_token=${mapboxToken}`;

      axios
        .get(url)
        .then(res => {
          const lat = res.data.features[1].center[1];
          const long = res.data.features[1].center[0];

          return getWeatherData(lat, long);
        })
        .catch(err => console.log(err));
    };

    const getWeatherData = (lat, long) => {
      const url = `https://api.darksky.net/forecast/${darkskyToken}/${lat},${long}?units=si`;

      axios.get(url).then(res => {
        const embed = new Discord.MessageEmbed();
        const currentData = res.data.currently;

        embed.setAuthor(message.author.username)
          .setColor(config.colors.embed)
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
      }).catch(err => console.log(err));
    }

    getWeather(args);
  }
};
