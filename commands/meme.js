const config = require('../config.json');
const Discord = require('discord.js');
const axios = require('axios');

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
        let memeURL = res.data.url;

        message.channel.send(memeURL);
      })
      .catch(err => console.log(err));
  }
};