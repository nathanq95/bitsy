const { Client } = require('pg');
const database = process.env.DATABASE;

const client = new Client({
  database: database,
  host: 'localhost',
});

client.connect()
  .then(() => {
    if (process.env.ENVIRONMENT !== 'test') console.log(`Connected to the ${database} database!`);
  })
  .catch((err) => {
    console.error(`Error connecting to the ${database} database: `, err.stack);
  });

module.exports = client;
