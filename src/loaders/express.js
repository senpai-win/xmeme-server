const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("../api/routes/index");
const task = require("../jobs/softDeleteMeme");

module.exports = async ({ app }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.enable("trust proxy");
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/", routes);
  //Implemented softDelete using a cron job which delete all entries having active as 0
  task.start();
  return app;
};
