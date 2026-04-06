export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export class LogEntity {
  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }
  //Factory constructor
  //* Estoy recibien un string con toda la info y lo transformo a JSON
  //Crea instancias basadas en el JSON.string
  static fromJSON = (json: string): LogEntity => {
    //Transformamos json.string a json
    const { message, level, createdAt } = JSON.parse(json);

    //Creamos y retornamos nueva instancia
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
  };
}
