import { describe } from "node:test";
import { envs } from "./envs.plugin";

describe("Test envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "evaalonso888@gmail.com",
      MAILER_SECRET_KEY: "tigbsxkoknvwjrdn",
      PROD: false,
      MONGO_URL: "mongodb://eva:123456@127.0.0.1:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: undefined,
      MONGO_PASS: "123456",
      POSTGRES_URL: "postgresql://postgres:123456@localhost:5432/NOC",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
