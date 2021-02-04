const client = require('../index');

const initDetails = () => client.query('INSERT INTO progress(completed) VALUES(false)');

module.exports = {
  initDetails,
};
