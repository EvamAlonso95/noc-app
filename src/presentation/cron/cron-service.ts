import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  //Si mandamos mas de 3 arg, se envia un objeto
  static createJob(cronTime: CronTime, onTick: OnTick) {
    const job = new CronJob(
      cronTime, // cronTime
      onTick, // onTick
    );
    job.start();
    return job;
  }
}
