// Return the command.
module.exports = {
  name: 'nickname',
  description:
    'Sets a nickname for the specified user.',
  aliases: ['nick', 'nn', 'name', 'nickn'],
  usage: '<@user> <nickname>',
  args: true,
  execute(client, message, args) {
    const user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    // Get the user from their ID and change their username.
    message.guild.fetchMember(user.id).then(response => {
      response.setNickname(args[1]);
    }).catch(error => client.logger.log('error', error));
  }
};