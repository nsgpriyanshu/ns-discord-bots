# nsdiscordbot (Python Discord Bot)

Welcome to the Discord Bot Project! This repository contains the code for a production-level Discord bot built using Python and `discord.py`. This bot includes a range of features such as message and slash command handling, event processing, and robust error logging. Below you'll find instructions on how to set up and run the bot, as well as details about the project's structure and contributing guidelines.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Running the Bot](#running-the-bot)
7. [Command and Event Structure](#command-and-event-structure)
8. [Contributing](#contributing)
9. [References](#references)
10. [Support](#support)
11. [Contributors](#contributors)

## Project Overview

This Python Discord bot is designed to interact with users on Discord servers by responding to commands and events. It features a flexible command handling system for both slash and message commands, robust error handling, and logging to ensure reliability in production environments.

## Features

- **Slash Commands**: Supports multiple slash commands organized in directories.
- **Message Commands**: Handles traditional text-based commands.
- **Event Handling**: Listens to and processes various Discord events.
- **Error Handling**: Logs errors with detailed messages for debugging.
- **Configuration Management**: Uses environment variables via `.env` for sensitive information.
- **Async Ready for Production**: Fully asynchronous, scalable for multiple servers.

## Prerequisites

- **Python 3.11+**: Ensure Python is installed.
- **discord.py**: This project uses `discord.py` v2.x.
- **A Discord Bot Token**: Obtain a bot token from the [Discord Developer Portal](https://discord.com/developers/applications).

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/nsgpriyanshu/nsdiscordbot.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd nsdiscordbot/python
   ```

3. **Create a Virtual Environment (Recommended)**:

   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # Linux / Mac
   ```

4. **Install Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. **Create a `.env` File** in the `python` directory and add the following environment variables:

   ```env
   DISCORD_TOKEN=your-discord-bot-token
   OWNER_ID=your-discord-user-id
   LOG_LEVEL=INFO
   CLIENT_ID=your-bot-client-id
   ```

2. **Bot Config Loader**: The bot uses `configs/bot_config.py` with Pydantic for validation. Ensure all required fields are present in `.env`.

---

## Running the Bot

1. **Start the Bot**:

   ```bash
   python bot.py
   ```

2. The bot will automatically load all commands and events and connect to Discord.

---

## Command and Event Structure

* **Commands**: Located in `commands/`. Commands are separated into `slashCommands` and `messageCommands` directories.
* **Events**: Event handlers are in `events/` and include ready events, message events, and interaction events.
* **Handlers**: `handlers/command_handler.py` dynamically loads commands.

### Example Message Command (`ping.py`)

```python
from discord import Message, Embed
from constants.bot_const import DEFAULT_EMBED_COLOR

class PingCommand:
    name = "ping"
    description = "Check bot latency"

    async def execute(self, message: Message, args: list[str]):
        sent = await message.channel.send("Pinging...")
        embed = Embed(title="Pong!", description="Roundtrip: 123ms", color=DEFAULT_EMBED_COLOR)
        await sent.edit(content=None, embed=embed)

command = PingCommand()
```

### Example Slash Command (`ping.py`)

```python
from discord import app_commands, Interaction, Embed
from constants.bot_const import DEFAULT_EMBED_COLOR
import time

async def ping_callback(interaction: Interaction):
    start = time.perf_counter()
    await interaction.response.send_message("Pinging...", ephemeral=True)
    latency_ms = (time.perf_counter() - start) * 1000
    embed = Embed(title="Pong!", description=f"Roundtrip: {latency_ms:.1f}ms", color=DEFAULT_EMBED_COLOR)
    await interaction.edit_original_response(content=None, embed=embed)

slash = app_commands.Command(
    name="ping",
    description="Check bot latency",
    callback=ping_callback
)
```

---

## Contributing

We welcome contributions! If you would like to contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with detailed descriptions.

---

## References

* [discord.py Documentation](https://discordpy.readthedocs.io/en/stable/) - Official documentation for creating Discord bots in Python.
* [Pydantic Settings](https://docs.pydantic.dev/2.12/settings/) - For environment variable management and validation.

---

## Support

If you need help or guidance, join our [Discord server](https://discord.gg/vRXgWaar2G) for community support.

---

## Contributors

[![nsgpriyanshu](https://img.shields.io/badge/Developer-nsgpriyanshu-author.svg?color=f10a0a)](https://nsgpriyanshu.github.io)
