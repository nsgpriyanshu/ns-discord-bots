# python/bot.py
import asyncio
import logging
from pathlib import Path

from discord import Intents
from discord.ext import commands
from configs.bot_config import BotConfig
from utils.logger import setup_logging
from handlers.command_handler import CommandHandler
from events.ready_handler import ReadyHandler
from events.message_handler import MessageHandler
from events.interaction_handler import InteractionHandler

CONFIG = BotConfig()  # loads from .env and validates

setup_logging(CONFIG.log_level)
log = logging.getLogger("nsbot")

def get_intents() -> Intents:
    intents = Intents.default()
    intents.message_content = True  # required for message commands (be careful with privileges)
    intents.guilds = True
    intents.members = False  # enable if you need member info
    return intents

def build_bot() -> commands.Bot:
    intents = get_intents()
    bot = commands.Bot(command_prefix="!", intents=intents, help_command=None)
    # Attach config and utilities to bot for global use
    bot.config = CONFIG
    return bot

async def main():
    bot = build_bot()

    # Register handlers
    CommandHandler(bot).load_all_commands()
    ReadyHandler(bot)
    MessageHandler(bot)
    InteractionHandler(bot)

    try:
        log.info("Starting bot")
        await bot.start(CONFIG.token)
    except KeyboardInterrupt:
        log.info("Received exit signal, closing...")
        await bot.close()

if __name__ == "__main__":
    asyncio.run(main())
