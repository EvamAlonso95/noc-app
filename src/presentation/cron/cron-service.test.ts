import { CronService } from "./cron-service";

describe("CronService", () => {
  const mockTick = jest.fn();

  //jest.clearAllMocks

  test("should create a job", (done) => {
    const job = CronService.createJob("* * * * * *", mockTick);

    setTimeout(() => {
      try {
        expect(mockTick).toHaveBeenCalled();
        job.stop();
        done();
      } catch (error) {
        done(error);
      }
    }, 2000);
  });
});
