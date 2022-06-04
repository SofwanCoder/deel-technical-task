import { Sequelize, SequelizeOptions } from "sequelize-typescript";

const options: SequelizeOptions = {
  dialect: "sqlite",
  storage: "./database.sqlite",
  models: [__dirname + "/models"],
  logging: true,
};

export const model = new Sequelize(options);
