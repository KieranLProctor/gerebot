const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'nickname',
  description:
    'Sets a nickname for the specified user.',
  aliases: ['nick', 'nn', 'name', 'nickn'],
  usage: '@<user> <nickname>',
  args: true,
  execute(message, args) {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    message.guild.fetchMember(user.id).then(res => {
      res.setNickname(args[1]);
    }).catch(err => console.log(err));
  }
};