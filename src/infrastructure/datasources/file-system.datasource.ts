import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

// Al ser un datasource, debemos implementar las reglas definidas en domain/datasource
export class FileSystemDatasource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  // Crea el directorio logs si no existe
  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    // Resto de directorios
    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        // Existe
        if (fs.existsSync(path)) return;
        //Si no existe lo creo con string vacio
        fs.writeFileSync(path, "");
      },
    );
  };

  //Aquí ya implementamos la lógica de los métodos
  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJSON = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJSON);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJSON);
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJSON);
    }
  }

  private getLogsFromFile = (path: string): LogEntity[] => {
    //Constante string con el contenido del FILE
    const content = fs.readFileSync(path, "utf-8");

    if (content === "") return [];
    //linea por linea vamos creando las instancias
    const logs = content.split("\n").map((log) => LogEntity.fromJSON(log));
    return logs;
  };

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);

      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);

      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);

      default:
        throw new Error(`${severityLevel} not implemented`);
    }
  }
}
