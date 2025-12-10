const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const { logger } = require('../utils/logger')
const config = require('../configs/botConfig')
const { COLORS, EMOJIS } = require('../constants/botConst')

const eventHandlerMessage = client => {
  client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return

    if (!message.content.startsWith(config.PREFIX)) return

    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift()?.toLowerCase()

    if (!commandName) return

    const command = client.messageCommands.get(commandName)

    if (!command) {
      logger.warn(`Command not found: ${commandName}`)

      const unknownCommand = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle(`You cannot use this command!`)
        .setDescription(`${EMOJIS.failed} There is no command like this`)
        .setTimestamp()
      return message.reply({ embeds: [unknownCommand] })
    }

    // Check user permissions
    if (
      command.userPermissions &&
      !message.member?.permissions.has(PermissionsBitField.resolve(command.userPermissions))
    ) {
      const userPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`You cannot use this command!`)
        .setDescription(
          `${EMOJIS.caution} You don't have the required permissions to use this command`,
        )
        .setTimestamp()
      return message.reply({ embeds: [userPermEmbed] })
    }

    // Check bot permissions
    if (!client.user) {
      logger.error('Client user is null')
      return
    }

    if (
      command.botPermissions &&
      !message.guild.members.cache
        .get(client.user.id)
        ?.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      const botPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`I cannot use this command!`)
        .setDescription(
          `${EMOJIS.caution} I don't have the required permissions to run this command`,
        )
        .setTimestamp()
      return message.reply({ embeds: [botPermEmbed] })
    }

    // Check if the command is owner only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(message.author.id)) {
      const devOnlyEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle(`You cannot use this command!`)
        .setDescription(`${EMOJIS.caution} This command is only for developers`)
        .setTimestamp()
      return message.reply({ embeds: [devOnlyEmbed] })
    }

    try {
      await command.executeMessage(message, args, client)
    } catch (error) {
      logger.error(`Error executing command: ${commandName}` + error)
      console.log(error)
      const eE = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Opps!')
        .setDescription(`${EMOJIS.failed} There was an error trying to run that command!`)
      await message.reply({ embeds: [eE] })
    }
  })
}

module.exports = { eventHandlerMessage }
