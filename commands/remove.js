// Dependencies.
const Discord = require('discord.js');
require('dotenv').config();

module.exports = {
  name: 'remove',
  description: 'Removes a track from the queue.',
  aliases: ['r', 'rem', 'rmve'],
  usage: '<position>',
  args: true,
  execute(message, args) {
    //get queue then remove specified track
  }
};