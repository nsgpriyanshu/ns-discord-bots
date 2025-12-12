# python/commands/slashCommands/general/ping.py

import time
import logging
from discord import Interaction, app_commands, Embed
from constants.bot_const import DEFAULT_EMBED_COLOR

log = logging.getLogger("nsbot.slash.ping")

async def ping_callback(interaction: Interaction):
    start = time.perf_counter()

    await interaction.response.send_message("Pinging...", ephemeral=True)
    latency_ms = (time.perf_counter() - start) * 1000

    embed = Embed(
        title="Pong!",
        description=f"Roundtrip latency: {latency_ms:.1f} ms",
        color=DEFAULT_EMBED_COLOR
    )
    embed.add_field(name="API Latency", value=f"{interaction.client.latency * 1000:.2f} ms")

    await interaction.edit_original_response(content=None, embed=embed)

# IMPORTANT: your loader expects a module variable named exactly `slash`
slash = app_commands.Command(
    name="ping",
    description="Check bot latency",
    callback=ping_callback
)
