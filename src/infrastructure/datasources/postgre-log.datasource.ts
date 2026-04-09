import { PrismaPg } from "@prisma/adapter-pg";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from "../../config/plugins/envs.plugin";
import { PrismaClient, SeverityLevel } from "../../../generated/prisma/client";

const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
const prisma = new PrismaClient({ adapter });

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};
export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];

    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level: level,
      },
    });
    console.log("Postgres Log Created", newLog.id);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prisma.logModel.findMany({
      where: {
        level: level,
      },
    });

    return dbLogs.map(LogEntity.fromObject);
  }
}
