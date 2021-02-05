const client = require('../index');

const initProgress = () => client.query('INSERT INTO progress(completed) VALUES(false)');

const getTodaysProgress = (data) => client.query(`SELECT * FROM progress WHERE id = ${data}`);

module.exports = {
  initProgress,
  getTodaysProgress,
};
