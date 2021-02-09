const client = require('../../database/index');
const { expect } = require('chai');
const { addDetails, getDetails, updateDetails, incrementCurrentHabit, deleteDetails} = require('../../database/methods/details');

describe ('details table methods', () => {
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
    await client.query('DELETE FROM details WHERE id >= 0');
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE details_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1');
  });

  describe('addDetails', () => {
    it ('should write details to the details table', async (done) => {
      const data = {
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '16:00',
        time_2: '17:00',
        time_3: '18:00',
        time_4: '19:00'
      };
      let actual, actualData;

      await addDetails(data);
      actual = await client.query('SELECT * FROM details WHERE id = 1');
      actualData = actual.rows[0];

      expect(data.day_0).to.equal(actualData.day_0);
      expect(data.day_1).to.equal(actualData.day_1);
      expect(data.day_2).to.equal(actualData.day_2);
      expect(data.day_3).to.equal(actualData.day_3);
      expect(data.day_4).to.equal(actualData.day_4);
      expect(data.day_5).to.equal(actualData.day_5);
      expect(data.day_6).to.equal(actualData.day_6);
      expect(data.time_1).to.equal(actualData.time_1);
      expect(data.time_2).to.equal(actualData.time_2);
      expect(data.time_3).to.equal(actualData.time_3);
      expect(data.time_4).to.equal(actualData.time_4);
      done();
    });
  });

  describe ('getDetails', () => {
    it ('should return details from the details table', async (done) => {
      const day = 1;
      const test = await getDetails(day);
      const testData = test.rows[0];
      const actual = await client.query('SELECT * FROM details WHERE id = 1');
      const actualData = actual.rows[0];

      expect(testData.current_habit).to.equal(actualData.current_habit);
      expect(testData.time_1).to.equal(actualData.time_1);
      expect(testData.time_2).to.equal(actualData.time_2);
      expect(testData.time_3).to.equal(actualData.time_3);
      expect(testData.time_4).to.equal(actualData.time_4);
      done();
    });
  });

  describe ('updateDetails', () => {
    it ('should update the details table', async (done) => {
      const id = 1;
      const data = {
        time_1: '12:00',
        day_0: false
      };
      let actual, actualData;

      await updateDetails(id, data);
      actual = await client.query('SELECT * FROM details WHERE id = 1');
      actualData = actual.rows[0];

      expect(data.time_1).to.equal(actualData.time_1);
      expect(data.day_0).to.equal(actualData.day_0);
      done();
    });
  });

  describe ('incrementCurrentHabit', () => {
    it ('should change the current habit in the details table', async (done) => {
      const id = 1;
      const testData = 2;
      let actual, actualData;

      await incrementCurrentHabit(id)
      actual = await client.query('SELECT current_habit FROM details WHERE id = 1');
      actualData = actual.rows[0];

      expect(testData).to.equal(actualData.current_habit);
      done();
    });
  });

  describe ('deleteDetails', () => {
    it ('should delete details from the details table', async (done) => {
      let actual, actualData;
      const id = 1;

      await deleteDetails(id);
      actual = await client.query('SELECT * FROM details WHERE id = 1');
      actualData = actual.rows;

      expect(actualData.length).to.equal(0);
      done();
    });
  });
});
