// # Jobs definitions for agenda.js
const cron = require("node-cron");
const Memes = require("../services/Memes");

const task = cron.schedule("5 2 * * 0", async () => {
  console.log("running a task every sunday at 2:05 AM");
  await Memes.hardDeleteMemes();
});

module.exports = task;
