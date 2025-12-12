# python/interfaces/command_interface.py
from typing import Protocol, Any
from discord import Interaction, Message

class MessageCommand(Protocol):
    name: str
    description: str

    async def execute(self, message: Message, args: list[str]) -> Any:
        ...

class SlashCommand(Protocol):
    name: str
    description: str

    async def register(self, tree) -> Any:
        ...
