// PrismaClient se importa desde la carpeta generada por "prisma generate",
// NO desde "@prisma/client" directamente, porque el schema tiene un output personalizado.

// Prisma v7 ya no incluye drivers de base de datos internamente.
// En su lugar, necesita un "adapter" externo que haga la conexión real.
// PrismaPg es el adapter oficial para PostgreSQL usando el paquete "pg".
import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

//Funcion anonima autoinvocada
(async () => {
  main();
})();

async function main() {
  //* MONGO
  // Conexion
  // await MongoDataBase.connect({
  //   mongoUrl: envs.MONGO_URL,
  //   dbName: envs.MONGO_DB_NAME,
  // });
  //* POSTGRES
  //* PRISMA
  // El adapter recibe la URL de conexión a PostgreSQL (ej: postgresql://user:pass@localhost:5432/db)
  // y se encarga de abrir y gestionar la conexión con el pool de "pg".
  // const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
  // PrismaClient ya no usa su propio driver interno; le pasamos el adapter para que
  // sepa cómo conectarse a la base de datos.
  // const prisma = new PrismaClient({ adapter });
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     level: "HIGH",
  //     message: "Test message",
  //     origin: "App.ts",
  //   },
  // });
  //* Obtener resultados
  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "HIGH",
  //   },
  // });
  // console.log(logs);
  //! MONGO
  //*Crear un coleccion = tabbles, documeto = registro
  // const newLog = await LogModel.create({
  //   message: "Test message desde Mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });
  // await newLog.save();
  // console.log(newLog);
  Server.start();
}
