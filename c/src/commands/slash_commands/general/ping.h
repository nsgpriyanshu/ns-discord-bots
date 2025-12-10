#ifndef PING_COMMAND_H
#define PING_COMMAND_H

#include <concord/discord.h>

/**
 * Handle the /ping slash command.
 */
void handle_ping_command(struct discord *client,
                         const struct discord_interaction *event);

#endif // PING_COMMAND_H
