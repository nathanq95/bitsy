const client = require('../index');

const initProgress = () => client.query('INSERT INTO progress(completed) VALUES(false)');

const getTodaysProgress = (data) => client.query(`SELECT * FROM progress WHERE id = ${data}`);

const completeHabit = (id, data) => client.query(`UPDATE progress SET completed = ${data}, streak = streak + 1 WHERE id = ${id}`)

module.exports = {
  initProgress,
  getTodaysProgress,
  completeHabit,
};
