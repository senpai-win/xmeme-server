// # Environment variables and configuration related stuff
module.exports = {
  port: process.env.PORT,
  db: {
    production: {
      host: process.env.DATABASE_URL,
      port: process.env.PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PWD,
      pool: {
        max: 20,
        min: 5,
      },
    },
    development: {
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      username: process.env.DEV_DB_USERNAME,
      password: process.env.DEV_DB_PASSWORD,
      pool: {
        max: 20,
        min: 5,
      },
    },
  },
};
