// Dependencies & instances.
const Discord = require("discord.js");
const { Player } = require("discord-player");
const winston = require("winston");
const client = new Discord.Client();
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" }),
  ],
  format: winston.format.printf(
    (log) => `[${log.level.toUpperCase()}] - ${log.message}`
  ),
});

// Assign instances to client variables (to access globally).
client.Discord = Discord;
client.commands = new Discord.Collection();
client.player = new Player(client);;
client.logger = logger;
client.moment = require("moment");
client.axios = require('axios');
client.config = require("./configs/config.json");
client.messages = require("./configs/lang.json");
client.emojis = require('./configs/emojis.json');
client.fs = require('fs');
client.env = require("dotenv").config();
client.cooldowns = new Discord.Collection();

// Get all of the event files.
const eventFiles = client.fs.readdirSync("./events");
// Loop through all of the events registering them.
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  client.on(file.split(".")[0], event.bind(null, client));

  client.logger.log("info", `Loaded the ${file.replace('.js', '').toUpperCase()} event file.`);
}

// Get all of the folders that hold commands.
const commandFolders = client.fs.readdirSync("./commands");
// Loop through all of the folders.
for (const folder of commandFolders) {
  // Get all of the files in this directory.
  const commandFiles = client.fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  // Loop through each command and add it to the collection.
  for (const file of commandFiles) {
    // Sets key in collection with command name & value.
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);

    client.logger.log("info", `Loaded the ${file.replace('.js', '').toUpperCase()} command file.`);
  }
}

// Login with the token.
client.login(client.env.parsed.DISCORD_TOKEN);
