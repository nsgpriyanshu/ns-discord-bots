#include "interaction_handler.h"
#include <concord/log.h>
#include <string.h>
#include "../handlers/command_handler.h"

void on_interaction_create(struct discord *client,
                           const struct discord_interaction *event)
{
    if (event->type != DISCORD_INTERACTION_APPLICATION_COMMAND) {
        // Ignore non-slash interactions for now
        return;
    }

    if (!event->data || !event->data->name) {
        log_info("Interaction without data/name, ignoring");
        return;
    }

    log_info("Received slash interaction: /%s", event->data->name);
    handle_slash_command(client, event);
}
