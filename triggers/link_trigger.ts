import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";

import getAsanaProjectWorkflow from "../workflows/get_asana_project.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const linkTrigger: Trigger<typeof getAsanaProjectWorkflow.definition> = {
  type: TriggerTypes.Shortcut,
  name: "Link trigger",
  description: "description",
  workflow: `#/workflows/${getAsanaProjectWorkflow.definition.callback_id}`,
  inputs: {
    channel: {
      value: TriggerContextData.Shortcut.channel_id,
    },
  },
};

export default linkTrigger;
