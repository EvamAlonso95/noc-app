export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { message, level, createdAt = new Date(), origin } = options;
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
    this.origin = origin;
  }
  //Factory constructor
  //* Estoy recibien un string con toda la info y lo transformo a JSON
  //Crea instancias basadas en el JSON.string
  static fromJSON = (json: string): LogEntity => {
    json = json === "" ? "{}" : json;
    //Transformamos json.string a json
    const { message, level, createdAt, origin } = JSON.parse(json);

    //Creamos y retornamos nueva instancia
    const log = new LogEntity({
      message,
      level,
      createdAt: new Date(createdAt),
      origin,
    });

    return log;
  };

  static fromObject = (objetc: { [key: string]: any }): LogEntity => {
    const { message, level, origin, createdAt } = objetc;
    const log = new LogEntity({
      message,
      level,
      createdAt,
      origin,
    });

    return log;
  };
}
