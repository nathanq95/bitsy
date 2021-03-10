const client = require('../index');

class Progress {
  init() {
    try {
      return client.query('INSERT INTO progress(completed) VALUES(false)');
    } catch (err) {
      throw new Error(err);
    }
  }

  get(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`SELECT * FROM progress WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  complete(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`UPDATE progress SET completed = true, streak = streak + 1 WHERE id = ${id} RETURNING streak`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  undoComplete(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`UPDATE progress SET completed = false, streak = streak - 1 WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  reset(id) {
    try {
      if (id) {
        if (typeof id !== 'number') {
          throw new Error('Invalid argument type');
        } else {
          return client.query(`UPDATE progress SET completed = false, streak = 0 WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
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
          return client.query(`DELETE FROM progress WHERE id = ${id}`);
        }
      } else {
        throw new Error('Missing argument');
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = Progress;
