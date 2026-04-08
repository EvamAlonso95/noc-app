import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

//Instancias para todos los useCase de ese repositorio
const logRepository = new LogRepositoryImp(
  new FileSystemDatasource(),
  //  new postgressSQLLogDatasource(),
  // new mongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // Mandar email a traves del use case

    //* Descomentar para mandar correo
    // new sendEmailLogs(emailService, fileSystemLogRepository).execute([
    //   "evaalonso888@gmail.com",
    //   "evam.alonso95@gmail.com",
    // ]);

    //* Hasta aquí

    // emailService.sendEmailWithFileSystemLogs([
    //   "evaalonso888@gmail.com",
    //   "evam.alonso95@gmail.com",
    // ]);

    // const logs = await logRepository.getLogs(LogSeverityLevel.low);
    // console.log(logs);

    // const url = "https://google.com";
    // CronService.createJob("*/5 * * * * *", () => {
    //   //Le paso las dependencias definidas en el construcctor
    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error),
    //   ).execute(url);
    // });
  }
}
