#ifndef COMMAND_HANDLER_H
#define COMMAND_HANDLER_H

#include <concord/discord.h>

/**
 * Dispatch slash commands by name.
 */
void handle_slash_command(struct discord *client,
                          const struct discord_interaction *event);

#endif // COMMAND_HANDLER_H
