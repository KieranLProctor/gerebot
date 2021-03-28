// Return the command.
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
    client.axios
      .get(url)
      .then(response => {
        message.channel.send(response.data.url);
      })
      .catch(error => client.logger.log('error', error));
  }
};