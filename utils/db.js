import knex from 'knex'
import knexConfig from "../pages/api/knexfile";
const db = knex(knexConfig["development"]);

db.raw("select 1+1 as result")
  .then((result) => {
    console.log(`Database is connected...`);
    // there is a valid connection in the pool
  })
  .catch((err) => {
    console.log("There was an error connecting to the database...", err);
  });

export default db
