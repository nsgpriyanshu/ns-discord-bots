#ifndef READY_HANDLER_H
#define READY_HANDLER_H

#include <concord/discord.h>

/**
 * Called when the client is READY.
 */
void on_ready(struct discord *client,
              const struct discord_ready *event);

#endif // READY_HANDLER_H
