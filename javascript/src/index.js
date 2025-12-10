const { Client, GatewayIntentBits, Collection } = require('discord.js')
const { logger } = require('./utils/logger')
const config = require('./configs/botConfig')
const { registerReadyEvent } = require('./events/readyHandler')
const { eventHandlerMessage } = require('./events/messageHandler')
const { eventHandlerInteraction } = require('./events/interactionHandler')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.slashCommands = new Collection()
client.messageCommands = new Collection()

registerReadyEvent(client)
eventHandlerMessage(client)
eventHandlerInteraction(client)

client
  .login(config.BOT_TOKEN)
  .then(() => logger.log('Bot logged in successfully'))
  .catch(err => logger.error('Error logging in: ' + err.message))
