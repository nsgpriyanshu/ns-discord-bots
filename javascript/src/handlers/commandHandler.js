const { REST, Routes, SlashCommandBuilder } = require('discord.js')
const { readdirSync, statSync } = require('fs')
const { join, extname } = require('path')
const { logger } = require('../utils/logger')
const config = require('../configs/botConfig')

const loadSlashCommands = dirs => {
  return new Promise((resolve, reject) => {
    const commands = []

    const loadCommandsFromDir = dir => {
      const files = readdirSync(dir)

      return Promise.all(
        files.map(async file => {
          const filePath = join(dir, file)
          const fileStat = statSync(filePath)

          if (fileStat.isDirectory()) {
            await loadCommandsFromDir(filePath) // Recursively load commands from subdirectories
          } else if (extname(file) === '.js') {
            // Load JavaScript files
            const command = require(filePath)
            if (command && command.data instanceof SlashCommandBuilder) {
              commands.push(command.data.toJSON())
            }
          }
        }),
      )
    }

    Promise.all(dirs.map(dir => loadCommandsFromDir(dir)))
      .then(() => resolve(commands))
      .catch(reject)
  })
}

// Convert directories to absolute paths
const absoluteIncludeDirectories = [
  'commands/slashCommands/general',
  'commands/slashCommands/info',
].map(dir => join(__dirname, '../', dir))

// Load slash commands
loadSlashCommands(absoluteIncludeDirectories)
  .then(commands => {
    const rest = new REST({ version: '10' }).setToken(config.BOT_TOKEN)
    logger.log('Started refreshing application (/) commands.')

    return rest.put(Routes.applicationCommands(config.BOT_ID), { body: commands })
  })
  .then(() => {
    logger.log('Successfully reloaded application (/) commands.')
  })
  .catch(error => {
    if (error instanceof Error) {
      logger.error(`Error registering commands: ${error.message}`)
    } else {
      logger.error('Unknown error occurred while registering commands.')
    }
  })

module.exports = { loadSlashCommands }
