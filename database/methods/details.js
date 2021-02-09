const client = require('../index');

const addDetails = (data) => client.query(`INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('${data.day_0}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);

const getDetails = (data) => client.query(`SELECT id, current_habit, time_1, time_2, time_3, time_4 FROM details WHERE day_${data} = true`);

const updateDetails = (id, data) => {
  let updateData = '';
  
  if (data.time_1) {
    updateData += ` time_1 = '${data.time_1}' `;
  }
  if (data.time_2) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` time_2 = '${data.time_2}' `;
  }
  if (data.time_3) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` time_3 = '${data.time_3}' `;
  }
  if (data.time_4) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` time_4 = '${data.time_4}' `;
  }
  if (data.day_0 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_0 = ${data.day_0} `;
  }
  if (data.day_1 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_1 = ${data.day_1} `;
  }
  if (data.day_2 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_2 = ${data.day_2} `;
  }
  if (data.day_3 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_3 = ${data.day_3} `;
  }
  if (data.day_4 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_4 = ${data.day_4} `;
  }
  if (data.day_5 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_5 = ${data.day_5} `;
  }
  if (data.day_6 !== undefined) {
    if (updateData.length > 0) {
      updateData += ',';
    }
    updateData += ` day_6 = ${data.day_6} `;
  }

  return client.query(`UPDATE details SET ${updateData} WHERE id = ${id}`);
};

const incrementCurrentHabit = (id) => client.query(`UPDATE details SET current_habit = current_habit + 1 WHERE id = ${id}`);

const deleteDetails = (id) => client.query(`DELETE FROM details WHERE id = ${id}`);

module.exports = {
  addDetails,
  getDetails,
  updateDetails,
  incrementCurrentHabit,
  deleteDetails,
};
