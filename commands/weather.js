const axios = require('axios');
const Discord = require('discord.js');
const moment = require('moment');
const config = require('../config.json');

module.exports = {
  name: 'weather',
  description:
    'Displays information about the weather in a specified location.',
  aliases: ['wthr', 'winf', 'winfo', 'forecast'],
  usage: '<location>',
  args: true,
  execute(message, args) {
    const getWeather = async args => {
      let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${args}.json?access_token=${config.apiKeys.mapbox}`;

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
      let url = `https://api.darksky.net/forecast/${config.apiKeys.darksky}/${lat},${long}`;

      axios.get(url).then(res => {
        let embed = new Discord.RichEmbed();

        embed.setAuthor(message.author.username)
          .setColor(config.colors.embed)
          .setDescription(`Weather information for ${args}.`)
          .addField('¬ Time', moment().format('llll'), true)
          .addField('¬ Summary', res.data.currently.summary, true)
          .addField('¬ Precipitation', `${res.data.currently.humidity}°C`, true)
          .addField('¬ Temperature', `${res.data.currently.temperature}°C`, true)
          .addField('¬ Dewpoint', res.data.currently.dewPoint, true)
          .addField('¬ Humidity', `${res.data.currently.humidity}%`, true)
          .addField('¬ Wind', `${res.data.currently.windBearing}°/${res.data.currently.windSpeed}kts`, true)
          .addField('¬ Visibility', res.data.currently.visibility, true)
          .addField('¬ UV Index', res.data.currently.uvIndex, true)
          .setTimestamp();

        message.channel.send(embed);
      }).catch(err => console.log(err));
    }

    getWeather(args);
  }
};
