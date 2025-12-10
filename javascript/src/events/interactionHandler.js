const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const { logger } = require('../utils/logger')
const config = require('../configs/botConfig')
const { COLORS, EMOJIS } = require('../constants/botConst')

const eventHandlerInteraction = client => {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || !interaction.guildId) return

    const commandName = interaction.commandName
    const command = client.slashCommands.get(commandName) // Use slashCommands collection

    if (!command) {
      logger.warn(`Command not found: ${commandName}`)
      return
    }

    // Check user permissions
    if (
      command.userPermissions &&
      !interaction.member?.permissions?.has(PermissionsBitField.resolve(command.userPermissions))
    ) {
      const userPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('You cannot use this command!')
        .setDescription(
          `${EMOJIS.caution} You don't have the required permissions to use this command`,
        )
        .setTimestamp()
      await interaction.reply({ embeds: [userPermEmbed], ephemeral: true })
      return
    }

    // Check bot permissions
    const botMember = interaction.guild?.members.cache.get(client.user?.id || '')
    if (
      command.botPermissions &&
      !botMember.permissions.has(PermissionsBitField.resolve(command.botPermissions))
    ) {
      const botPermEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('I cannot use this command!')
        .setDescription(
          `${EMOJIS.caution} I don't have the required permissions to run this command`,
        )
        .setTimestamp()
      await interaction.reply({ embeds: [botPermEmbed], ephemeral: true })
      return
    }

    // Check if the command is owner only
    if (command.devOnly && !config.DEVELOPER_IDS.includes(interaction.user.id)) {
      const devOnlyEmbed = new EmbedBuilder()
        .setColor(COLORS.yellow)
        .setTitle('You cannot use this command!')
        .setDescription(`${EMOJIS.caution} This command is only for developers.`)
        .setTimestamp()
      await interaction.reply({ embeds: [devOnlyEmbed], ephemeral: true })
      return
    }

    try {
      await command.executeSlash(interaction, client)
    } catch (error) {
      logger.error(`Error executing command: ${commandName} - ${error}`)
      console.log(error)
      const errorEmbed = new EmbedBuilder()
        .setColor(COLORS.red)
        .setTitle('Oops!')
        .setDescription(`${EMOJIS.failed} There was an error trying to execute that command!`)
        .setTimestamp()
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  })
}

module.exports = { eventHandlerInteraction }
