// Return the event.
module.exports = async (client) => {
  client.logger.log(
    'info',
    `Logged in as ${client.user.tag} on ${client
      .moment()
      .format('llll')}, serving ${client.guilds.cache.size} guild(s)!`,
  )

  client.user.setActivity(`${client.config.prefix}help`)
}
