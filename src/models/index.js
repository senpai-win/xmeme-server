// # Database models using Sequelize ORM
const Sequelize = require("sequelize");
const { db } = require("../config/index");

const MemeModel = require("./meme");

const databaseOptions = db.production;

const sequelize = new Sequelize({
  ...databaseOptions,
  dialect: "mysql",
  database: "database1",
  port: 3306
});

const Meme = MemeModel(sequelize, Sequelize);

sequelize
  .sync({ alter: true, force: true })
  .then(() => {
    console.log(`Database and Tables Created`);
  })
  .catch((error) => console.log(error, "error"));

module.exports = {
  Meme,
};
