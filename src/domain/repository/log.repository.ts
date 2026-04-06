import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//Permite llamar métodos que se encuentran dentro del datasource
export abstract class LogRepository {
  // DATASOURCE
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
