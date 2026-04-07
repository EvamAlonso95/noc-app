// import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.impl";
// import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//Instancias para todos los useCase de ese repositorio
const fileSystemLogRepository = new LogRepositoryImp(
  new FileSystemDatasource(),
  //  new postgressSQLLogDatasource(),
  //  new MongoLogDatasource(),
);

export class Server {
  public static start() {
    console.log("Server started...");

    //todo: Mandar email
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmailWithFileSystemLogs([
    //   "evaalonso888@gmail.com",
    //   "evam.alonso95@gmail.com",
    // ]);

    // const url = "https://google.com";
    // CronService.createJob("*/5 * * * * *", () => {
    //   //Le paso las dependencias definidas en el construcctor
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    //   //   new CheckService().execute("http://localhost:3000/");
    // });
  }
}
