// Dependencies.
const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  name: 'meme',
  description: 'Sends an edgy meme from reddit to the channel.',
  aliases: ['mem', 'meem'],
  usage: '[<subreddit>]',
  args: false,
  execute(client, message, args) {
    const subreddit = (args.length != 0) ? `/${args}` : '';
    const url = `https://meme-api.herokuapp.com/gimme${subreddit}`;

    axios
      .get(url)
      .then(res => {
        message.channel.send(res.data.url);
      })
      .catch(err => console.log(err));
  }
};