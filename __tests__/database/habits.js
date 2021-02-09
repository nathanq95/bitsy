const client = require('../../database/index');
const { expect } = require('chai');
const { addHabit, getHabitOverview, getCurrentHabit, updateHabit, deleteHabit } = require('../../database/methods/habits');

describe ('habits table methods', () => {
  beforeAll ( async () => {
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1')
  });

  afterAll (async () => {
    await client.query('DELETE FROM habits WHERE id >= 0');
    await client.query('ALTER SEQUENCE habits_id_seq RESTART WITH 1')
  });

  describe ('addHabit', () => {
    it ('should write to the habits table', async (done) => {
      const data = {
      habit_1: 'a',
      habit_2: 'b',
      habit_3: 'c',
      habit_4: 'd'
    };

    await addHabit(data);
    const result = await client.query('SELECT * FROM habits WHERE id = 1');
    const resultData = result.rows[0];

    expect(resultData.habit_1).to.equal(data.habit_1);
    expect(resultData.habit_2).to.equal(data.habit_2);
    expect(resultData.habit_3).to.equal(data.habit_3);
    expect(resultData.habit_4).to.equal(data.habit_4);
    done();
    });
  });

  describe ('getHabitOverview', () => {
    it ('should return all four habits from the habits table', async (done) => {
      const id = 1;
      const test = await getHabitOverview(id);
      const testData = test.rows[0];
      const actual = await client.query(`SELECT * FROM habits WHERE id = 1`);
      const actualData = actual.rows[0];

      expect(testData.habit_1).to.equal(actualData.habit_1);
      expect(testData.habit_2).to.equal(actualData.habit_2);
      expect(testData.habit_3).to.equal(actualData.habit_3);
      expect(testData.habit_4).to.equal(actualData.habit_4);
      done();
    });
  });

  describe ('getCurrentHabit', () => {
    it ('should return a habit from the habits table', async (done) => {
      const id = 1;
      const habit = 2;
      const result = await getCurrentHabit(id, habit);
      const resultData = result.rows[0];
      const actual = await client.query(`SELECT habit_${habit} FROM habits WHERE id = ${id}`);
      const actualData = actual.rows[0];

      expect(resultData[`habit_${habit}`]).to.equal(actualData[`habit_${habit}`]);
      done();
    });
  });

  describe ('updateHabit', () => {
    it ('should update values on the habit table', async (done) => {
      const id = 1;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_3: 'g',
        habit_4: 'j'
      };
      let actual;
      let actualData;
      await updateHabit(id, data);

      actual = await client.query(`SELECT * FROM habits WHERE id = 1`);
      actualData = actual.rows[0];
      expect(data.habit_1).to.equal(actualData.habit_1);
      expect(data.habit_2).to.equal(actualData.habit_2);
      expect(data.habit_3).to.equal(actualData.habit_3);
      expect(data.habit_4).to.equal(actualData.habit_4);
      done();
    });
  });
  
  describe ('deletehabit', () => {
    it ('should delete a habit from the habits table', async (done) => {
      const id = 1;
      let actual;
      let actualData;

      await deleteHabit(id);
      actual = await client.query(`SELECT * FROM habits WHERE id = ${id}`);
      actualData = actual.rows;
      
      expect(actualData.length).to.equal(0);
      done();
    });
  });
});
