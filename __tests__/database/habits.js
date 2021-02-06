const client = require('../../database/index');
const { expect } = require("chai");
const { addHabit, getHabitOverview, getCurrentHabit, updateHabit, deleteHabit } = require('../../database/methods/habits');

describe ('Habit table methods', () => {

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
    it ('should return four habits from the habits table', async () => {
      const result = await getHabitOverview(1);
      const resultData = result.rows[0];
      
      expect(resultData.habit_1).to.equal('a');
      expect(resultData.habit_2).to.equal('b');
      expect(resultData.habit_3).to.equal('c');
      expect(resultData.habit_4).to.equal('d');
    });
  });

  describe ('getCurrentHabit', () => {
    it ('should return a habit from the habits table', async () => {
      const result = await getCurrentHabit(1, 1);
      const resultData = result.rows[0];

      expect(resultData.habit_1).to.equal('a');
    });
  });

  
    
});