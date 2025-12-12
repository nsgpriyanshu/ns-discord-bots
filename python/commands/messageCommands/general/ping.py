# python/commands/messageCommands/general/ping.py
import time
import logging
from discord import Message, Embed
from constants.bot_const import DEFAULT_EMBED_COLOR

log = logging.getLogger("nsbot.command.ping")

class PingCommand:
    name = "ping"
    description = "Check bot latency"

    async def execute(self, message: Message, args: list[str]):
        start = time.perf_counter()
        sent = await message.channel.send("Pinging...")
        latency_ms = (time.perf_counter() - start) * 1000
        embed = Embed(title="Pong!", description=f"Roundtrip: {latency_ms:.1f}ms", color=DEFAULT_EMBED_COLOR)
        embed.add_field(name="API latency", value=f"{message.guild.me.guild_permissions}", inline=False)
        await sent.edit(content=None, embed=embed)

command = PingCommand()
