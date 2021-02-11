const client = require('../index');

class Progress {
  init() {
    return client.query('INSERT INTO progress(completed) VALUES(false)');
  }

  get(data) {
    return client.query(`SELECT * FROM progress WHERE id = ${data}`);
  }

  complete(id) {
    return client.query(`UPDATE progress SET completed = true, streak = streak + 1 WHERE id = ${id} RETURNING streak`);
  }

  undoComplete(id) {
    return client.query(`UPDATE progress SET completed = false, streak = streak - 1 WHERE id = ${id}`);
  }

  reset(id) {
    return client.query(`UPDATE progress SET completed = false, streak = 0 WHERE id = ${id}`);
  }

  delete(id) {
    return client.query(`DELETE FROM progress WHERE id = ${id}`);
  }
}

module.exports = Progress;
