const path = require("path");

const env = process.env.NODE_ENV || "development";
const user = process.env.DB_USER || "";
const password = process.env.DB_PASSWORD || "";
module.exports = {
  development: {
    client: "pg",
    connection: `postgres://${user}:${password}@localhost/hockey`,
    migrations: {
      directory: path.join(__dirname, "/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds", env),
    },
  },

  test: {
    client: "pg",
    connection: `postgres://${user}:${password}@localhost/test_db`,
    migrations: {
      directory: path.join(__dirname, "/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds", env),
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL || "",
    migrations: {
      directory: path.join(__dirname, "/db/migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "/db/seeds", env),
    },
  },
};
