import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import SlackFunction from "./get_asana_project.ts";

const { createContext } = SlackFunctionTester("get_asana_project_function");

Deno.test("Sample function test", async () => {
  const inputs = { user: "U01234567" };
  const env = { "ASANA_TOKEN": Deno.env.get("ASANA_TOKEN") ?? "" };
  const { outputs } = await SlackFunction(createContext({ inputs, env }));
  if (!outputs?.response) {
    throw new Error("Invalid output");
  }
  const d = JSON.parse(outputs.response);
  await assertEquals(
    d.data[0].name,
    "Slack platform",
  );
});
