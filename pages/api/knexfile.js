module.exports = {
  development: {
    client: "pg",
    debug: true,
    connection: {
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      user: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    // searchPath: ["knex", "public"],
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
