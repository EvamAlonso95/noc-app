import { describe } from "node:test";
import { envs } from "./envs.plugin";

describe("Test envs.plugin.ts", () => {
  test("should return env options", () => {
    console.log(envs);
  });
});
