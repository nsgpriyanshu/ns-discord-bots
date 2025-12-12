# python/utils/logger.py
import logging
import sys

def setup_logging(level: str = "INFO"):
    level = getattr(logging, level.upper(), logging.INFO)
    root = logging.getLogger()
    root.setLevel(level)

    handler = logging.StreamHandler(sys.stdout)
    handler.setLevel(level)
    fmt = logging.Formatter("%(asctime)s | %(levelname)-7s | %(name)s | %(message)s")
    handler.setFormatter(fmt)
    root.addHandler(handler)
