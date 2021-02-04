const { Client } = require('pg');

const client = new Client({
  database: 'habits',
  host: 'localhost',
});

client.connect()
  .then(() => {
    console.log('Connected to ProgreSQL database!');
  })
  .catch((err) => {
    console.error('Error connecting to database: ', err.stack);
  });

module.exports = client;
