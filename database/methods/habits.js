const client = require('../index');

class Habits {
  add(data) {
    return client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);
  }

  getOverview(id) {
    return client.query(`SELECT habit_1, habit_2, habit_3, habit_4 FROM habits WHERE id = ${id}`);
  }

  getCurrent(id, data) {
    return client.query(`SELECT id, habit_${data} FROM habits WHERE id = ${id}`);
  }

  update(id, data) {
    let updateData = '';

    if (data.habit_1) {
      updateData += ` habit_1 = '${data.habit_1}' `;
    }
    if (data.habit_2) {
      if (updateData.length > 0) {
        updateData += ',';
      }
      updateData += ` habit_2 = '${data.habit_2}' `;
    }
    if (data.habit_3) {
      if (updateData.length > 0) {
        updateData += ',';
      }
      updateData += ` habit_3 = '${data.habit_3}' `;
    }
    if (data.habit_4) {
      if (updateData.length > 0) {
        updateData += ',';
      }
      updateData += ` habit_4 = '${data.habit_4}' `;
    }
  
    return client.query(`UPDATE habits SET ${updateData} WHERE id = ${id}`);
  }

  delete(id) {
    return client.query(`DELETE FROM habits WHERE id = ${id}`);
  }
}

module.exports = Habits;
