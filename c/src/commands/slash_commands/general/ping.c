#include "ping.h"
#include <concord/log.h>

void handle_ping_command(struct discord *client,
                         const struct discord_interaction *event)
{
    struct discord_interaction_response response = {
        .type = DISCORD_INTERACTION_CHANNEL_MESSAGE_WITH_SOURCE,
        .data = &(struct discord_interaction_callback_data){
            .content = "Pong from C slash command!"
        }
    };

    discord_create_interaction_response(
        client,
        event->id,
        event->token,
        &response,
        NULL
    );

    log_info("Responded to /ping");
}
