//  # Split the startup process into modules
require("dotenv").config();
require("../models/index");
const expressLoader = require("./express");

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log("Express Initialized");

  // ...more loaders can be here
};
