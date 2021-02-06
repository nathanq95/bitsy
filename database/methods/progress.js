const { cli } = require('webpack');
const client = require('../index');

const initProgress = () => client.query('INSERT INTO progress(completed) VALUES(false)');

const getTodaysProgress = (data) => client.query(`SELECT * FROM progress WHERE id = ${data}`);

const completeHabit = (id, data) => client.query(`UPDATE progress SET completed = ${data}, streak = streak + 1 WHERE id = ${id} RETURNING streak`);

const undoComplete = (id) => client.query(`UPDATE progress SET completed = false, streak = streak - 1 WHERE id = ${id}`);

const resetProgress = (id) => client.query(`UPDATE progress SET completed = false, streak = 0 WHERE id = ${id}`);

const deleteProgress = (id) => client.query(`DELETE FROM progress WHERE id = ${id}`);

module.exports = {
  initProgress,
  getTodaysProgress,
  completeHabit,
  undoComplete,
  resetProgress,
  deleteProgress,
};
