const client = require('../index');

const addHabit = (data) => client.query(`INSERT INTO habits(goal_habit, prereq_habit_1, prereq_habit_2, prereq_habit_3) VALUES('${data.goal_habit}', '${data.habit_1}', '${data.habit_2}', '${data.habit_3}')`);

module.exports = {
  addHabit,
};
