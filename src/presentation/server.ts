import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImp } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

//Instancias para todos los useCase de ese repositorio
const fileSystemLogRepository = new LogRepositoryImp(
  new FileSystemDatasource(),
  //  new postgressSQLLogDatasource(),
  //  new MongoLogDatasource(),
);

const emailService = new EmailService();

export class Server {
  public static start() {
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
