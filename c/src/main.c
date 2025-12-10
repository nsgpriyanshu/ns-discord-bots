#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#include <concord/discord.h>
#include <concord/log.h>

#include "configs/bot_config.h"
#include "events/ready_handler.h"
#include "events/interaction_handler.h"

int main(int argc, char **argv)
{
    const char *config_file;

    if (argc > 1) {
        config_file = argv[1];
    } else {
        config_file = BOT_CONFIG_FILE;
    }

    // Initialize global shared resources (Concord + libcurl)
    ccord_global_init();

    struct discord *client = discord_config_init(config_file);
    assert(client != NULL && "Couldn't initialize Discord client");

    // Wire up events
    discord_set_on_ready(client, &on_ready);
    discord_set_on_interaction_create(client, &on_interaction_create);

    log_info("Starting Discord bot using config: %s", config_file);

    CCORDcode code = discord_run(client);
    if (code != CCORD_OK) {
        log_error("discord_run() exited with code %d", code);
    }

    discord_cleanup(client);
    ccord_global_cleanup();

    return (code == CCORD_OK) ? EXIT_SUCCESS : EXIT_FAILURE;
}
