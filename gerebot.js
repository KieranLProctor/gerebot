// Dependencies.
const fs = require("fs");
const Discord = require("discord.js");
const moment = require("moment");
const { Player } = require("discord-player");
const config = require("./configs/config.json");
const messages = require("./configs/lang.json");
require("dotenv").config();
const winston = require("winston");
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" }),
  ],
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

// Get language & locale from the config.
const language = config.language.toLowerCase();
const locale = config.locale;

// Get .env items.
const token = process.env.DISCORD_TOKEN;
const ownerID = process.env.OWNER_ID;

// Make new instance of Discord client & make command collection.
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Make new instance of Discord-player & queue.
const player = new Player(client);
client.player = player;

// Make new collection for commands on a cooldown.
const cooldowns = new Discord.Collection();

// Set moment locale & current time.
moment().locale(locale);
const currentTime = moment().format("LTS");

// Get all of the event files.
const eventFiles = fs.readdirSync("./events");
// Loop through all of the events registering them.
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));

  logger.log("info", `Loaded the ${file} event file.`);
}

// Get all of the folders that hold commands.
const commandFolders = fs.readdirSync("./commands");
// Loop through all of the folders.
for (const folder of commandFolders) {
  // Get all of the files in this directory.
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  // Loop through each command and add it to the collection.
  for (const file of commandFiles) {
    // Sets key in collection with command name & value.
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);

    logger.log("info", `Loaded the ${file} command file.`);
  }
}

// Bot ready event listener.
client.once("ready", () => {
  logger.log(
    "info",
    `Logged in as ${client.user.tag} at ${currentTime} serving ${client.guilds.cache.size} guild(s)!`
  );

  client.user.setActivity(`${config.prefix}help`);
});

// Bot message event listener.
client.on("message", (message) => {
  // If msg doesnt start with prefix or sent from bot => return.
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // Gets the args from the message.
  const args = message.content.slice(config.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Assigns command to a var to make easier to do logic.
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // If isnt a command => return.
  if (!command) return;

  // If command is sent in dm but is guild only => return.
  if (command.guildOnly && message.channel.type !== "text") {
    return message.reply(messages[language].messages.error.guild_command);
  }

  // If command requires args but doesnt get any => return.
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
    // If has time left on cooldown don't run.
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(messages[language].messages.error.cooldown);
    }
  }

  // Sets the cooldown and deletes the message.
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Tries to execute the command the user typed.
  try {
    command.execute(client, message, args);
  } catch (error) {
    logger.log("error", error);

    message.reply(messages[language].messages.error.wrong_command);
  }
});

// Login with the token.
client.login(token);
