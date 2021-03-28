// Return the command.
module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '<command name>',
  cooldown: 5,
  execute(client, message, args) {
    const data = [];
    const { commands } = message.client;

    // If no args => send help for all commands.
    if (!args.length) {
      data.push(`\`Here's a list of all my commands:\``);
      data.push(`\`${commands.map(command => command.name).join(',\n')}\``);
      data.push(`\nYou can send \`${client.config.prefix}help <command>\` to get info on a specific command!`);

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply(`I've sent you a DM with all my commands!`);
        })
        .catch(error => {
          client.logger.log('error', `Couldn't send help DM to ${message.author.tag}.`);
          
          message.reply(`it seems like I can't DM you!`);
        });
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) return message.reply(`that's not a valid command!`);

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) {
      data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    }

    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }

    if (command.usage) {
      data.push(`**Usage:** ${client.config.prefix}${command.name} ${command.usage}`);
    }

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  }
};
