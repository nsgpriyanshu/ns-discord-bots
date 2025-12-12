# python/events/interaction_handler.py
import logging
from discord import Interaction
from discord.ext import commands

log = logging.getLogger("nsbot.interaction")

class InteractionHandler:
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        bot.add_listener(self.on_interaction)

    async def on_interaction(self, interaction: Interaction):
        # Optionally centralize logging or errors for interactions
        try:
            # default behavior: nothing to change
            pass
        except Exception as e:
            log.exception("Interaction handling error: %s", e)
            if interaction.response.is_done():
                try:
                    await interaction.followup.send("An error occurred.", ephemeral=True)
                except Exception:
                    pass
            else:
                try:
                    await interaction.response.send_message("An error occurred.", ephemeral=True)
                except Exception:
                    pass
