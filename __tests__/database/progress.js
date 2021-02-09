const client = require('../../database/index');
const { expect } = require('chai');
const { initProgress, getProgress, completeProgress, undoComplete, resetProgress, deleteProgress} = require('../../database/methods/progress');

describe ('progress table methods', () => {
  beforeAll ( async () => {
    const data = {
      habit_1: 'a',
      habit_2: 'b',
      habit_3: 'c',
      habit_4: 'd'
    };
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1')
    return client.query(`INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('${data.habit_1}', '${data.habit_2}', '${data.habit_3}', '${data.habit_4}')`)
  });

  afterAll (async () => {
    await client.query('DELETE FROM progress WHERE id >= 0');
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE progress_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1');
  });

  describe ('initProgress', () => {
    it ('should generate initial data in the progress table', async (done) => {
      let actual, actualData;
      const expectedData = {
        id: 1,
        completed: false,
        streak: 0
      }

      await initProgress();
      actual = await client.query('SELECT * FROM progress WHERE id = 1');
      actualData = actual.rows[0];

      expect(actualData.id).to.equal(expectedData.id);
      expect(actualData.completed).to.equal(expectedData.completed);
      expect(actualData.streak).to.equal(expectedData.streak);
      done();
    });
  });

  describe ('getTodaysProgress', () => {
    it ('should return all data', async (done) => {
      let actual, actualData;
      const id = 1;
      const expectedData = {
        id: 1,
        completed: false,
        streak: 0
      }

      await getProgress(id);
      actual = await client.query('SELECT * FROM progress WHERE id = 1');
      actualData = actual.rows[0];

      expect(actualData.id).to.equal(expectedData.id);
      expect(actualData.completed).to.equal(expectedData.completed);
      expect(actualData.streak).to.equal(expectedData.streak);
      done();
    });
  });

  describe ('completeProgress', () => {
    it ('should set the completed column to true', async (done) => {
      let actual, actualData;
      const id = 1;

      await completeProgress(id);
      actual = await client.query('SELECT completed FROM progress WHERE id = 1');
      actualData = actual.rows[0];

      expect(actualData.completed).to.equal(true);
      done();
    });
  });

  describe ('undoComplete', () => {
    it ('should set the completed column to false', async (done) => {
      let actual, actualData;
      const id = 1;

      await undoComplete(id);
      actual = await client.query('SELECT completed FROM progress WHERE id = 1');
      actualData = actual.rows[0];

      expect(actualData.completed).to.equal(false);
      done();
    });
  });

  describe ('resetProgress', () => {
    it ('should reset the completed & streak columns to their initial values', async (done) => {
      let actual, actualData;
      const id = 1;

      await resetProgress(id);
      actual = await client.query('SELECT completed, streak FROM progress WHERE id = 1');
      actualData = actual.rows[0];

      expect(actualData.completed).to.equal(false);
      expect(actualData.streak).to.equal(0);
      done();
    });
  });
  
  describe ('deleteProgress', () => {
    it ('should delete data from the progress table', async (done) => {
      let actual, actualData;
      const id = 1;
      
      await deleteProgress(id);
      actual = await client.query('SELECT * FROM progress WHERE id = 1');
      actualData = actual.rows;

      expect(actualData.length).to.equal(0);
      done();
    });
  });
});
