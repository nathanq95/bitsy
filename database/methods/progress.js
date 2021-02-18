const client = require('../index');

class Progress {
  init() {
    return client.query('INSERT INTO progress(completed) VALUES(false)');
  }

  get(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`SELECT * FROM progress WHERE id = ${id}`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  complete(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`UPDATE progress SET completed = true, streak = streak + 1 WHERE id = ${id} RETURNING streak`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  undoComplete(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`UPDATE progress SET completed = false, streak = streak - 1 WHERE id = ${id}`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  reset(id) {
    if (typeof id !== 'number') {
      if (id) {
        throw new Error('Invalid argument type');
      } else {
        throw new Error('Missing argument');
      }
    } else {
      try {
        return client.query(`UPDATE progress SET completed = false, streak = 0 WHERE id = ${id}`);
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
        return client.query(`DELETE FROM progress WHERE id = ${id}`);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}

module.exports = Progress;
