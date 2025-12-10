#ifndef INTERACTION_HANDLER_H
#define INTERACTION_HANDLER_H

#include <concord/discord.h>

/**
 * Called whenever an interaction is created (slash commands, buttons, etc.).
 */
void on_interaction_create(struct discord *client,
                           const struct discord_interaction *event);

#endif // INTERACTION_HANDLER_H
