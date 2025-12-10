const { logPastelPink } = require('nstypocolors')
const { ActivityType } = require('discord.js')
const { BOT } = require('../configs/botConfig')

const registerReadyEvent = client => {
  client.once('ready', () => {
    logPastelPink(`Successfully connected both Message & Slash clients ${client.user?.tag}!`)

    client.user?.setPresence({
      activities: [
        {
          name: `${BOT.PREFIX}help • ${client.user?.username}`,
          type: ActivityType.Custom,
        },
      ],
      status: 'online',
    })
  })
}

module.exports = { registerReadyEvent }
