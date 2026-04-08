import { envs } from "./config/plugins/envs.plugin";
import { MongoDataBase } from "./data/mongo";
import { Server } from "./presentation/server";

//Funcion anonima autoinvocada
(async () => {
  main();
})();

async function main() {
  // Conexion
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  //*Crear un coleccion = tabbles, documeto = registro

  // const newLog = await LogModel.create({
  //   message: "Test message desde Mongo",
  //   origin: "App.ts",
  //   level: "low",
  // });

  // await newLog.save();

  // console.log(newLog);

  //* Leer registros
  // const logs = await LogModel.find();
  // console.log(logs);

  // Server.start();
}
