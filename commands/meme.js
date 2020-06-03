// Dependencies.
const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  name: "meme",
  description: "Sends an edgy meme from reddit to the channel.",
  aliases: ["mem", "meem"],
  usage: '[<subreddit>]',
  args: false,
  execute(message, args) {
    let subreddit = (args.length != 0) ? `/${args}` : '';
    let url = `https://meme-api.herokuapp.com/gimme${subreddit}`;

    axios
      .get(url)
      .then(res => {
        message.channel.send(res.data.url);
      })
      .catch(err => console.log(err));
  }
};