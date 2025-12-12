# python/events/ready_handler.py
import logging
from discord.ext import commands

log = logging.getLogger("nsbot.ready")

class ReadyHandler:
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        bot.add_listener(self.on_ready)

    async def on_ready(self):
        log.info("%s is ready — id: %s", self.bot.user, self.bot.user.id)
        # Sync application commands (careful with global sync; prefer guild sync in dev)
        try:
            # You may want to restrict to specific guilds for fast development:
            await self.bot.tree.sync()
            log.info("Application commands synced.")
        except Exception as exc:
            log.exception("Failed to sync application commands: %s", exc)
