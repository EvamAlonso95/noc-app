import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

//Obliga el comportamiento que quiero definir sobre este Data Source sobre otras
//Reglas de negocio para los DATASOURCE
export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

//const logDS = new LogDataSource() //! No se puede crear una instancia de una clase abstracta
