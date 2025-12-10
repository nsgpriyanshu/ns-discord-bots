#include "ready_handler.h"
#include <concord/log.h>
#include <inttypes.h>
#include "../constants/bot_const.h"

void on_ready(struct discord *client,
              const struct discord_ready *event)
{
    (void)client; // not needed except for API calls

    log_info("Logged in as %s#%s",
             event->user->username,
             event->user->discriminator);

    // Register a guild slash command: /ping
    struct discord_create_guild_application_command params = {
        .name = "ping",
        .description = "Ping command"
    };

    discord_create_guild_application_command(
        client,
        event->application->id,
        GUILD_ID,
        &params,
        NULL
    );

    log_info("Registered /ping in guild %" PRIu64, (uint64_t)GUILD_ID);
}
