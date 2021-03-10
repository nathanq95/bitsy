const client = require('../index');

class Habits {
  add(data) {
    if (typeof data !== 'object') {
      if (data) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        if (!data.habit_1 || !data.habit_2 || !data.habit_3 || !data.habit_4) {
          throw new Error('Missing required value(s)');
        }
        return client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  getOverview(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`SELECT habit_1, habit_2, habit_3, habit_4 FROM habits WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  getCurrent(id, data) {
    try {
      if (id && data) {
        if (typeof id !== 'number' || typeof data !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`SELECT id, habit_${data} FROM habits WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument(s)');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  update(id, data) {
    try {
      if (id && data) {
        if (typeof id !== 'number' || typeof data !== 'object') {
          throw new Error('Invalid argument type');
        } else {
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
      } else {
        throw new Error('Missing argument(s)');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  delete(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`DELETE FROM habits WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Habits;
