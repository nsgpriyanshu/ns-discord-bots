# python/configs/bot_config.py
from pydantic_settings import BaseSettings
from pydantic import Field
from dotenv import load_dotenv

load_dotenv()

class BotConfig(BaseSettings):
    token: str = Field(..., env="DISCORD_TOKEN")
    owner_id: int | None = Field(None, env="OWNER_ID")
    log_level: str = Field("INFO", env="LOG_LEVEL")

    client_id: int | None = Field(None, env="CLIENT_ID")  # <— Add this

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"   # <— Prevent errors from extra fields
