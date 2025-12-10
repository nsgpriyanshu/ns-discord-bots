cmake_minimum_required(VERSION 3.15)
project(ns_discord_bot_c C)

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED ON)

add_executable(ns_discord_bot_c
    src/main.c
    src/events/ready_handler.c
    src/events/interaction_handler.c
    src/handlers/command_handler.c
    src/commands/slash_commands/general/ping.c
)

target_include_directories(ns_discord_bot_c PRIVATE
    src
    src/events
    src/handlers
    src/commands
    src/commands/slash_commands/general
    src/configs
    src/constants
)

# If Concord installed to a non-standard prefix, uncomment and adjust:
# target_include_directories(ns_discord_bot_c PRIVATE "C:/cygwin64/usr/local/include")
# target_link_directories(ns_discord_bot_c PRIVATE "C:/cygwin64/usr/local/lib")

find_package(Threads REQUIRED)

# Link against Concord + libcurl + threads
target_link_libraries(ns_discord_bot_c PRIVATE discord curl Threads::Threads)
