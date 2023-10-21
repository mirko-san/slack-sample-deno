import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

import ky from "ky";

/**
 * Functions are reusable building blocks of automation that accept
 * inputs, perform calculations, and provide outputs. Functions can
 * be used independently or as steps in workflows.
 * https://api.slack.com/automation/functions/custom
 */
export const getAsanaProjectFunctionDefinition = DefineFunction({
  callback_id: "get_asana_project_function",
  title: "Get Asana project function",
  description: "description",
  source_file: "functions/get_asana_project.ts",
  output_parameters: {
    properties: {
      response: {
        type: Schema.types.string,
        description: "json",
      },
    },
    required: ["response"],
  },
});

/**
 * SlackFunction takes in two arguments: the CustomFunction
 * definition (see above), as well as a function that contains
 * handler logic that's run when the function is executed.
 * https://api.slack.com/automation/functions/custom
 */
export default SlackFunction(
  getAsanaProjectFunctionDefinition,
  async ({ env }) => {
    const api = ky.create({
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${env["ASANA_TOKEN"]}`,
      },
      prefixUrl: "https://app.asana.com/api/1.0/",
    });
    // XXX: 面倒なのでignore
    // deno-lint-ignore no-explicit-any
    const r = await api.get("projects").json<{ data: any[] }>();
    const data = r.data.filter((d) => {
      // NOTE: 紹介記事を書くにあたり
      // 他のprojectが見えたら面倒なのでフィルタ
      return d.name === "Slack platform";
    }).map((d) => {
      return {
        ...d,
        // NOTE: 紹介記事を書くにあたり
        // gidをdrop
        gid: undefined,
      };
    });
    const response = JSON.stringify({ data }, null, 2);

    return { outputs: { response } };
  },
);
