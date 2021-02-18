const e = require('express');
const client = require('../index');

class Details {
  add(data) {
    if (typeof data !== 'object') {
      if (data) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        if (!data.day_0 || !data.day_1 || !data.day_3 || !data.day_4 || !data.day_5 || !data.day_6 || !data.time_1 || !data.time_2 || !data.time_3 || !data.time_4) {
          throw new Error('Missing required value(s)');
        }
        return client.query(`INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('${data.day_0}', '${data.day_1}', '${data.day_2}', '${data.day_3}', '${data.day_4}', '${data.day_5}', '${data.day_6}', '${data.time_1}', '${data.time_2}', '${data.time_3}', '${data.time_4}')`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  get(data) {
    if (typeof data !== 'number') {
      if (data) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`SELECT id, current_habit, time_1, time_2, time_3, time_4 FROM details WHERE day_${data} = true`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  update(id, data) {
    if (typeof id !== 'number' || typeof data !== 'object') {
      if (!id || !data) {
        throw new Error('Missing argument(s)');
      } else {
        throw new Error('Invalid argument type');
      }
    } else {
      try {
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
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  updateCurrent(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`UPDATE details SET current_habit = current_habit + 1 WHERE id = ${id}`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  delete(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`DELETE FROM details WHERE id = ${id}`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

module.exports = Details;
