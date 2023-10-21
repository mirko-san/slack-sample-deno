import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { getAsanaProjectFunctionDefinition } from "../functions/get_asana_project.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/automation/forms#add-interactivity
 */
const getAsanaProjectWorkflow = DefineWorkflow({
  callback_id: "get_asana_project",
  title: "get_asana_project",
  description: "AsanaのProjectを取得",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["channel"],
  },
});

/**
 * Custom functions are reusable building blocks
 * of automation deployed to Slack infrastructure. They
 * accept inputs, perform calculations, and provide
 * outputs, just like typical programmatic functions.
 * https://api.slack.com/automation/functions/custom
 */
const getAsanaProject = getAsanaProjectWorkflow.addStep(
  getAsanaProjectFunctionDefinition,
  {},
);

/**
 * SendMessage is a Slack function.
 * https://api.slack.com/automation/functions
 */
getAsanaProjectWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: getAsanaProjectWorkflow.inputs.channel,
  message: getAsanaProject.outputs.response,
});

export default getAsanaProjectWorkflow;
