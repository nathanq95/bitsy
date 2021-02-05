const client = require('../index');

const addDetails = (data) => client.query(`INSERT INTO details(current_habit, day_1, day_2, day_3, day_4, day_5, day_6, day_7, time_1, time_2, time_3, time_4) VALUES ('${data.current_habit}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.day_7}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);

const getDetails = (data) => client.query(`SELECT id, current_habit, time_1, time_2, time_3, time_4 FROM details WHERE day_${data} = true`);

module.exports = {
  addDetails,
  getDetails,
};
