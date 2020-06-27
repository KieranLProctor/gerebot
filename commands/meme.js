// Dependencies.
const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Send a random or specified subreddits meme to the channel.',
  aliases: ['meem', 'mem'],
  usage: '[<subreddit>]',
  args: false,
  execute(client, message, args) {
    const subreddit = (args.length != 0) ? `/${args}` : '';
    const url = `https://meme-api.herokuapp.com/gimme${subreddit}`;

    // Get the meme and send message.
    axios
      .get(url)
      .then(res => {
        message.channel.send(res.data.url);
      })
      .catch(err => console.log(err));
  }
};