// # App entry point
require("dotenv").config();
const loaders = require("./loaders/index");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerUI.json');

const PORT = require("./config/index").port || 8081;

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });


  app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is ready!`, PORT);
  });
}

startServer();
