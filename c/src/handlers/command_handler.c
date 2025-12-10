#include "command_handler.h"
#include <string.h>
#include <concord/log.h>
#include "../commands/slash_commands/general/ping.h"

void handle_slash_command(struct discord *client,
                          const struct discord_interaction *event)
{
    if (!event->data || !event->data->name) {
        log_info("Slash command interaction without a name, ignoring");
        return;
    }

    const char *name = event->data->name;

    if (strcmp(name, "ping") == 0) {
        handle_ping_command(client, event);
    } else {
        log_info("Unknown slash command: /%s", name);
    }
}
