# python/events/message_handler.py
import logging
from discord import Message
from discord.ext import commands

log = logging.getLogger("nsbot.message")

class MessageHandler:
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        bot.add_listener(self.on_message)

    async def on_message(self, message: Message):
        # ignore bots and DMs by default
        if message.author.bot:
            return
        if message.guild is None:
            # Optionally allow DMs
            return

        # example: simple prefix handler
        prefix = getattr(self.bot.config, "command_prefix", "!")
        if not message.content.startswith(prefix):
            return

        without_prefix = message.content[len(prefix) :].strip()
        if not without_prefix:
            return

        parts = without_prefix.split()
        cmd = parts[0].lower()
        args = parts[1:]

        # attempt to find loaded message command
        cmd_obj = getattr(self.bot, f"message_command_{cmd}", None)
        if cmd_obj:
            try:
                await cmd_obj.execute(message, args)
            except Exception as exc:
                log.exception("Message command %s failed: %s", cmd, exc)
                await message.reply("There was an error running that command.", mention_author=False)
        # allow other commands to be processed (if using commands extension)
        await self.bot.process_commands(message)
