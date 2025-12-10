# nsdiscordbot (C Discord Bot)

This project is a production-level Discord bot written in C using the Concord library.
It implements interaction handling, event dispatching, and a modular structure similar to a JavaScript/Node.js Discord bot.
The bot currently supports slash commands, including a sample `/ping` command, and is structured for easy feature expansion.

---

## Features

* Written in C (C99)
* Uses Concord for Discord Gateway, HTTPS, TLS, WebSocket, and JSON functionality
* Fully modular project structure
* Slash command support
* Automatic slash command registration on startup
* Event-based architecture
* Configurable through `config.json`
* Clean CMake build system

---

## Project Structure

```
c/
│   CMakeLists.txt
│   config.json.example
│
└───src
    │   main.c
    │
    ├──commands
    │   └──slash_commands
    │       └──general
    │               ping.c
    │               ping.h
    │
    ├──configs
    │       bot_config.h
    │
    ├──constants
    │       bot_const.h
    │
    ├──events
    │       interaction_handler.c
    │       interaction_handler.h
    │       ready_handler.c
    │       ready_handler.h
    │
    └──handlers
            command_handler.c
            command_handler.h
```

This structure follows the same logic as a modern JavaScript Discord bot, separating commands, events, handlers, constants, and configuration files.

---

## Requirements

To build this project, the following dependencies are required:

### Required Libraries

* Concord (Discord C library)
* libcurl
* pthreads (Linux/macOS) or Windows equivalent through Cygwin
* CMake 3.15 or newer
* GCC or Clang

### Supported Environments

* Linux
* macOS
* Windows (via Cygwin only; Concord does not support MinGW or MSYS2)

---

## Installing Concord

Clone and install Concord:

```
git clone https://github.com/Cogmasters/concord.git
cd concord
make
sudo make install
```

This installs:

* libdiscord
* headers such as `concord/discord.h`
* logging tools
* ccord global helpers

---

## Configuration

Before running the bot, create a `config.json` file:

1. Copy the example file:

```
cp config.json.example config.json
```

2. Open `config.json` and edit the following:

```
"token": "YOUR_DISCORD_BOT_TOKEN"
```

3. Ensure no comments or trailing commas are present; JSON must be strictly valid.

### Guild ID

Update `src/constants/bot_const.h`:

```
#define GUILD_ID 123456789012345678ULL
```

Replace with the ID of the guild where you want the slash commands to be registered.

---

## Building the Project

### Build Steps

Run the following commands inside the `c/` directory:

```
mkdir build
cd build
cmake ..
cmake --build .
```

This produces the compiled executable:

```
ns_discord_bot_c
```

or on Windows (Cygwin):

```
ns_discord_bot_c.exe
```

---

## Running the Bot

Run the bot from the build directory:

```
./ns_discord_bot_c
```

Or specify a custom configuration file:

```
./ns_discord_bot_c ../config.json
```

---

## Slash Commands

On startup, the bot automatically registers the following command:

### `/ping`

Responds with a simple message indicating the bot is running.

---

## Event Flow

1. `main.c` initializes the Discord client using `config.json`
2. `ready_handler.c` fires when the bot is fully connected and registers slash commands
3. `interaction_handler.c` receives all interaction events such as slash commands
4. `command_handler.c` dispatches interactions to the correct command implementation
5. `ping.c` handles the `/ping` command

---

## Extending the Bot

To add new slash commands:

1. Create a new folder in:

```
src/commands/slash_commands/<category>/
```

2. Add a `.c` and `.h` implementation
3. Register the command in `ready_handler.c`
4. Add dispatch logic in `command_handler.c`

The system is designed to scale without rewriting core logic.

---

## Troubleshooting

### Missing includes (VS Code IntelliSense)

If you get errors such as:

```
cannot open source file "concord/discord.h"
```

Add the include path manually in:

```
.vscode/c_cpp_properties.json
```

Example:

```
"includePath": [
    "${workspaceFolder}/src",
    "/usr/local/include"
]
```

### Linker errors

Ensure Concord is properly installed:

```
ls /usr/local/lib | grep discord
```

### Slash commands not appearing

Slash commands take several minutes to propagate globally.
For development, always register commands in a single guild.


## Contributors

[![nsgpriyanshu](https://img.shields.io/badge/Developer-nsgpriyanshu-author.svg?color=f10a0a)](https://nsgpriyanshu.github.io)