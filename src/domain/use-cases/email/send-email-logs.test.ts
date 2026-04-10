import { LogRepository } from "../../repository/log.repository";
import { sendEmailLogs } from "./send-email-logs";
import { LogEntity } from "../../entities/log.entity";

describe("send-email-logs", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
  };
  const mockLogRepository: LogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmail = new sendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  test("should call sendEmail and saveLog", async () => {
    const result = await sendEmail.execute("evaalonso888@gmail.com");

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );

    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "low",
      message: "Log email sent",
      origin: "send-email-logs.ts",
    });
  });
  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const result = await sendEmail.execute("evaalonso888@gmail.com");

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
      createdAt: expect.any(Date),
      level: "high",
      message: "Error: Email log not sent",
      origin: "send-email-logs.ts",
    });
  });
});
