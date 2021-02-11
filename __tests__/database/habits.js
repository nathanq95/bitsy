const { expect } = require('chai');
const Habits = require('../../database/methods/habits');

describe ('habits table methods', () => {
  const habits = new Habits();

  describe ('add', () => {
    it ('should write to the habits table', async (done) => {
      const data = {
      habit_1: 'a',
      habit_2: 'b',
      habit_3: 'c',
      habit_4: 'd'
     };
    const addHabitTest  = await habits.add(data);

    expect(addHabitTest).to.equal("INSERT INTO habits(habit_1, habit_2, habit_3, habit_4) VALUES('a', 'b', 'c', 'd')");
    done();
    });
  });

  describe ('get', () => {
    it ('should return all four habits', async (done) => {
      const id = 1;
      const getOverviewTest = await habits.getOverview(id);

      expect(getOverviewTest).to.equal('SELECT habit_1, habit_2, habit_3, habit_4 FROM habits WHERE id = 1');
      done();
    });
  });

  describe ('getCurrent', () => {
    it ('should return a habit', async (done) => {
      const id = 1;
      const habit = 2;
      const getCurrentHabitTest = await habits.getCurrent(id, habit);

      expect(getCurrentHabitTest).to.equal('SELECT id, habit_2 FROM habits WHERE id = 1');
      done();
    });
  });

  describe ('update', () => {
    it ('should update values', async (done) => {
      const id = 1;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_3: 'g',
        habit_4: 'h'
      };
      const updateHabitTest = await habits.update(id, data);

      expect(updateHabitTest).to.equal("UPDATE habits SET  habit_1 = 'e' , habit_2 = 'f' , habit_3 = 'g' , habit_4 = 'h'  WHERE id = 1");
      done();
    });
  });
  
  describe ('delete', () => {
    it ('should delete data from the habits table', async (done) => {
      const id = 1;
      const deleteTest = await habits.delete(id);

      expect(deleteTest).to.equal('DELETE FROM habits WHERE id = 1');
      done();
    });
  });
});
