const { MessageEmbed } = require('discord.js')
const { COLORS, EMOJIS } = require('../../constants/botConst')

module.exports = {
  name: 'ping',
  description: 'Responds with Pong!',
  usage: '',
  async executeMessage(message, args, client) {
    const pongEmbed = new MessageEmbed()
      .setColor(COLORS.green)
      .setTitle('Pong!')
      .setDescription(`${EMOJIS.success} The bot is online and responding.`)
      .setTimestamp()

    await message.reply({ embeds: [pongEmbed] })
  },
}
