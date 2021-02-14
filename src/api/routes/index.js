// # Express route controllers for all the endpoints of the app
const { Router } = require("express");

const memes = require("./memes");

const app = Router();

app.use("/", memes);

module.exports = app;
