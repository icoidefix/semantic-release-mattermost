import { Config } from "./Config";
import { Context } from "semantic-release";

import { WebhookProps, webhook } from "./webhook";

export async function success(config: Config, context: Context) {
  const { nextRelease, logger } = context;
  logger.log("Executing webhook.");

  const hook = context.env.MATTERMOST_WEBHOOK || config.webhook;
  const messageText = `The ${nextRelease.type} version "${nextRelease.version}" has been released.\n\n${nextRelease.notes}`;
  const message: WebhookProps["message"] = {
    username: context.env.MATTERMOST_USER || config.username,
  };

  if (config.asAttachment) {
    message.attachments = [
      {
        color: context.env.MATTERMOST_COLOR || "#bdb535",
        text: messageText,
      },
    ];
  } else {
    message.text = messageText;
  }

  if (context.env.MATTERMOST_ICON) {
    message.icon_url = context.env.MATTERMOST_ICON;

    if (config.asAttachment) {
      message.attachments[0].thumb_url = context.env.MATTERMOST_ICON;
    }
  }

  await webhook({
    hook,
    message,
    logger,
  });
}
