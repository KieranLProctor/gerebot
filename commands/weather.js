// Dependencies.
const Discord = require('discord.js');
const axios = require('axios');
const config = require('../config.json');
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
  execute(message, args) {
    const getWeather = async args => {
      let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${args}.json?access_token=${mapboxToken}`;

      axios
        .get(url)
        .then(res => {
          let lat = res.data.features[1].center[1];
          let long = res.data.features[1].center[0];

          return getWeatherData(lat, long);
        })
        .catch(err => console.log(err));
    };

    const getWeatherData = (lat, long) => {
      let url = `https://api.darksky.net/forecast/${darkskyToken}/${lat},${long}?units=si`;

      axios.get(url).then(res => {
        let embed = new Discord.MessageEmbed();

        embed.setAuthor(message.author.username)
          .setColor(config.colors.embed)
          .setDescription(`Weather information for ${args}.`)
          .addFields(
            { name: '¬ Summary', value: res.data.currently.summary, inline: true },
            { name: '¬ Pressure', value: res.data.currently.pressure, inline: true },
            { name: '¬ Precipitation', value: `${res.data.currently.precipProbability}%`, inline: true }
          )
          .addFields(
            { name: '¬ Temperature', value: `${res.data.currently.temperature}°C`, inline: true },
            { name: '¬ Dewpoint', value: `${res.data.currently.dewPoint}°C`, inline: true },
            { name: '¬ Humidity', value: `${res.data.currently.humidity}%`, inline: true }
          )
          .addFields(
            { name: '¬ Wind', value: `${res.data.currently.windBearing}°/${res.data.currently.windSpeed}kts`, inline: true },
            { name: '¬ Visibility', value: res.data.currently.visibility, inline: true },
            { name: '¬ UV Index', value: res.data.currently.uvIndex, inline: true }
          )
          .setTimestamp();

        message.channel.send(embed);
      }).catch(err => console.log(err));
    }

    getWeather(args);
  }
};
