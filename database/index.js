const { Client } = require('pg');
let database;

if (!process.env.TEST) {
  database = 'habits';
} else {
  database = process.env.TEST;
}

const client = new Client({
  database: database,
  host: 'localhost',
});

client.connect()
  .then(() => {
    console.log(`Connected to the ${database} database!`);
  })
  .catch((err) => {
    console.error(`Error connecting to the ${database} database: `, err.stack);
  });

module.exports = client;
