module.exports = (client, message) => {
  // If msg doesnt start with prefix or sent from bot => return.
  if (!message.content.startsWith(client.config.prefix) || message.author.bot) return;

  // Gets the args from the message.
  const args = message.content.slice(client.config.prefix.length).split(/ +/);
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
    return message.reply(client.messages[language].messages.error.guild_command);
  }

  // If command requires args but doesnt get any => return.
  if (command.args && !args.length) {
    // Sending the user the correct way to do the command.
    let reply = `${message.author}, You didn't provide any arguments!`;
    if (command.usage) {
      reply += `\nThe correct usage would be: \`${client.config.prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  // If command has cooldown set active.
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  // Gets UNIX time
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  // Checking if same user tried to use command.
  if (timestamps.has(message.author.id)) {
    // If has time left on cooldown don't run.
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(client.messages[language].messages.error.cooldown);
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

    message.reply(client.messages[language].messages.error.wrong_command);
  }
}
