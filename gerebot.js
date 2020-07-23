// Dependencies.
const fs = require('fs');
const Discord = require('discord.js');
const moment = require('moment');
const { Player } = require("discord-player");
const config = require('./configs/config.json');
const messages = require('./configs/lang.json');
require('dotenv').config();

// Used to get the correct language from the config.
const language = config.language.toLowerCase();

// .env items.
const token = process.env.DISCORD_TOKEN;
const ownerID = process.env.OWNER;

// New instance of discord client & command collection.
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Discord-player instance & queue.
const player = new Player(client, process.env.YOUTUBE_TOKEN);
client.player = player;

// New collection for commands on a cooldown.
const cooldowns = new Discord.Collection();

// Sets current time to var so can be used later.
moment().locale('en-gb');
const currentTime = moment().format('LTS');

// Getting all of the files in the dir.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Looping & adding every file in commandFiles.
for (const file of commandFiles) {
  let command = require(`./commands/${file}`);

  // Sets key in collection with command name & value.
  client.commands.set(command.name, command);
}

// Bot ready event listener.
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag} at ${currentTime} serving ${client.guilds.cache.size} guild(s)!`);

  client.user.setActivity(`${config.prefix}help`);
});

// Bot message event listener.
client.on('message', message => {
  // If msg doesnt start with prefix or sent from bot => return.
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // Gets the args from the message.
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Assigns command to a var to make easier to do logic.
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // If isnt a command => return.
  if (!command) return;

  // If command is sent in dm but is guild only => return.
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply(messages[language].messages.error.guild_command);
  }

  // If command req args but doesnt get any => return.
  if (command.args && !args.length) {
    // Sending the user the correct way to do the command.
    let reply = `${message.author}, You didn't provide any arguments!`;

    if (command.usage) {
      reply += `\nThe correct usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // If command has cooldown set active.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // Gets UNIX time
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  // Checking if same user tried to use command.
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    // If has time left on cooldown don't run.
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;

      return message.reply(messages[language].messages.error.cooldown);
    }
  }

  // Sets the cooldown and deletes the message.
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Tries to exec the command the user typed.
  try {
    command.execute(client, message, args);
  } catch (error) {
    console.log(error);

    message.reply(messages[language].messages.error.wrong_command);
  }
});

// Login with the token.
client.login(token);