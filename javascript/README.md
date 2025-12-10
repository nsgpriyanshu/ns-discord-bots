# nsdiscordbot (JavaScript Discord Bot)

Welcome to the Discord Bot Project! This repository contains the code for a production-level Discord bot built using Discord.js. This bot includes a range of features such as command handling, event handling, and error logging. Below you'll find instructions on how to set up and run the bot, as well as details about the project's structure and contributing guidelines.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Bot](#running-the-bot)
7. [Command and Event Structure](#command-and-event-structure)
8. [Contributing](#contributing)

## Project Overview

This Discord bot is designed to interact with users on Discord servers by responding to commands and events. It features a flexible command handling system and robust error handling to ensure reliability.

## Features

- **Slash Commands**: Supports multiple slash commands organized in directories.
- **Message Commands**: Handles traditional text commands.
- **Event Handling**: Listens to and processes various Discord events.
- **Error Handling**: Logs and reports errors to a specified channel.
- **Configuration Management**: Uses environment variables for sensitive information.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (preferably the latest LTS version).
- **Discord.js**: This project uses Discord.js v14.
- **A Discord Bot Token**: Obtain a bot token from the [Discord Developer Portal](https://discord.com/developers/applications).

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nsgpriyanshu/nsdiscordbot.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd your-discord-bot-repo
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` File** in the root directory of the project and add the following environment variables:

   ```env
   BOT_TOKEN=your-discord-bot-token
   BOT_ID=your-discord-bot-id
   ERROR_CHANNEL=your-error-log-channel-id
   DEVELOPER_IDS=comma-separated-list-of-developer-ids
   ```

2. **Update `botConfig.js`** with the appropriate configuration values:
   ```js
   module.exports = {
     BOT_TOKEN: process.env.BOT_TOKEN,
     BOT_ID: process.env.BOT_ID,
     ERROR_CHANNEL: process.env.ERROR_CHANNEL,
     DEVELOPER_IDS: process.env.DEVELOPER_IDS.split(','),
   }
   ```

## Running the Bot

1. **Start the Bot**:
   ```bash
   npm start
   ```

## Command and Event Structure

- **Commands**: Commands are located in the `src/commands` directory. Commands are separated into `slashCommands` and `messageCommands` subdirectories.
- **Events**: Event handlers are located in the `src/events` directory. They include interaction events and message events.

### Example Command File (`ping.js`)

```js
const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
  async execute(interaction) {
    await interaction.reply('Pong!')
  },
}
```

### Example Event File (`messageCreate.js`)

```js
const { EmbedBuilder } = require('discord.js')
const { COLORS, EMOJIS } = require('../constants/botConst')

module.exports = {
  name: 'messageCreate',
  execute(message) {
    // Event logic for message creation
  },
}
```

## Contributing

We welcome contributions to this project! If you want to contribute, then you are welcome.

## References

- [Discord.js Guide](https://discordjs.guide/#before-you-begin) - The official Discord.js guide, aimed at users who are either unfamiliar or inexperienced with Node.js and creating Discord bots. It assumes you have a basic understanding of JavaScript.

## Support

If you need assistance with understanding the documentation, encounter any issues, or simply require guidance, please join our [Discord server](https://discord.gg/vRXgWaar2G). Our community and support team are here to help you!

## Contributors

[![nsgpriyanshu](https://img.shields.io/badge/Developer-nsgpriyanshu-author.svg?color=f10a0a)](https://nsgpriyanshu.github.io)
