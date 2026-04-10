import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("logEntity", () => {
  const dataObj = {
    message: "Hola Mundo",
    level: LogSeverityLevel.high,
    origin: "log.entity.test.ts",
  };
  test("should create a Log Entity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity fromJSONJson", () => {
    const json = `{"level":"low","message":"Service https://google.com is working","createdAt":"2026-04-09T08:31:15.397Z","origin":"check-service.ts"}`;

    const log = LogEntity.fromJSON(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe("Service https://google.com is working");
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.origin).toBe("check-service.ts");
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
