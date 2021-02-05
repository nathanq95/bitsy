const client = require('../index');

const addHabit = (data) => client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);

const getHabitOverview = (data) => client.query(`SELECT habit_1, habit_2, habit_3, habit_4 from habits WHERE id = ${data}`);

const getCurrentHabit = (id, data) => client.query(`SELECT id, habit_${data} FROM habits WHERE id = ${id} `);

module.exports = {
  addHabit,
  getHabitOverview,
  getCurrentHabit,
};
