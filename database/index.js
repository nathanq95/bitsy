const { Client } = require('pg');

const client = new Client({
  database: 'habits',
  host: 'localhost',
});

client.connect()
  .then(() => {
    console.log('Connected to the ProgreSQL database!');
  })
  .catch((err) => {
    console.error('Error connecting to the database: ', err.stack);
  });

module.exports = client;
