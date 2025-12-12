# python/handlers/command_handler.py
import importlib.util
import logging
from pathlib import Path
from typing import Optional

from discord import app_commands
from discord.ext import commands

log = logging.getLogger("nsbot.command_handler")

class CommandHandler:
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.base = Path(__file__).parents[1] / "commands"

    def _iter_py_files(self, subpath: Path):
        for p in subpath.rglob("*.py"):
            if p.name.startswith("_"):
                continue
            yield p

    def load_message_command(self, path: Path):
        spec = importlib.util.spec_from_file_location(path.stem, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)  # type: ignore
        command_obj = getattr(module, "command", None)
        if command_obj is None:
            log.warning("No 'command' in %s", path)
            return
        setattr(self.bot, f"message_command_{command_obj.name}", command_obj)
        log.info("Loaded message command: %s", command_obj.name)

    def load_slash_command(self, path: Path):
        spec = importlib.util.spec_from_file_location(path.stem, path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)  # type: ignore
        slash = getattr(module, "slash", None)
        if slash is None:
            # allow modules that register via a `register` coroutine function
            register_func = getattr(module, "register", None)
            if register_func:
                # call during ready to register with bot.guilds or globally
                self.bot.loop.create_task(register_func(self.bot))
                log.info("Queued register() for slash module %s", path)
            else:
                log.warning("No 'slash' or 'register' in %s", path)
            return
        # slash can be a function that returns app_commands.Command or a ready-to-add object
        if isinstance(slash, app_commands.Command):
            self.bot.tree.add_command(slash)
            log.info("Registered slash command: %s", slash.name)
        else:
            log.info("Loaded slash module: %s", path)

    def load_all_commands(self):
        log.info("Loading commands from %s", self.base)
        # message commands
        msg_dir = self.base / "messageCommands"
        if msg_dir.exists():
            for p in self._iter_py_files(msg_dir):
                self.load_message_command(p)
        # slash commands
        slash_dir = self.base / "slashCommands"
        if slash_dir.exists():
            for p in self._iter_py_files(slash_dir):
                self.load_slash_command(p)
