const client = require('../index');

const addHabit = (data) => client.query(`INSERT INTO habits(habit_goal, habit_1, habit_2, habit_3) VALUES('${data.goal_habit}', '${data.habit_1}', '${data.habit_2}', '${data.habit_3}')`);

const getHabitOverview = (data) => client.query(`SELECT habit_goal, habit_1, habit_2, habit_3 from habits WHERE id = ${data}`);

module.exports = {
  addHabit,
  getHabitOverview,
};
