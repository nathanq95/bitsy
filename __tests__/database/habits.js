const Habits = require('../../database/methods/habits');

jest.mock('../../database/index', () => {
  const client = {
    query: jest.fn((str) => str)
  }

  return client;
});

describe ('habits table methods', () => {
  const habits = new Habits();

  describe ('add', () => {
    it ('should run an INSERT query on the habits table', async (done) => {
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

    it ('should throw an error if data is undefined', (done) => {
      const addHabitTest = () => habits.add();

      expect(addHabitTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if an expected value is undefined', (done) => {
      const data = {
        habit_1: 'a',
        habit_3: 'c',
        habit_4: 'd'
      }

      const addHabitTest = () => habits.add(data);

      expect(addHabitTest).toThrow('Missing required value(s)');
      done();
    });

    it ('should throw an error if all expected values are undefined', (done) => {
      const data = {
        habit_5: 'a',
        habit_6: 'b',
        habit_7: 'c',
        habit_8: 'd'
      };

      const addHabitTest = () => habits.add(data);

      expect(addHabitTest).toThrow('Missing required value(s)');
      done();
    });

    it ('should throw an error if argument is not of type object', (done) => {
      const addHabitTest = () => habits.add('abcd');

      expect(addHabitTest).toThrow('Invalid argument type');
      done();
    });
  });

  describe ('getOverview', () => {
    it ('should run a SELECT query to return all four habits', async (done) => {
      const id = 1;
      const getOverviewTest = await habits.getOverview(id);

      expect(getOverviewTest).to.equal('SELECT habit_1, habit_2, habit_3, habit_4 FROM habits WHERE id = 1');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const getOverviewTest = () => habits.getOverview();

      expect(getOverviewTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const getOverviewTest = () => habits.getOverview(id);

      expect(getOverviewTest).toThrow('Invalid argument type');
      done();
    });
  });

  describe ('getCurrent', () => {
    it ('should run a SELECT query to return a habit', async (done) => {
      const id = 1;
      const data = 2;
      const getCurrentHabitTest = await habits.getCurrent(id, data);

      expect(getCurrentHabitTest).to.equal('SELECT id, habit_2 FROM habits WHERE id = 1');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const data = 2;

      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is not of type number', (done) => {
      const id = 1;
      const data = '2';

      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      let id;
      const data = 2;
      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Missing argument(s)');
      done();
    });

    it ('should throw an error if data is undefined', (done) => {
      const id = 1;
      let data;
      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Missing argument(s)');
      done();
    });
  });

  describe ('update', () => {
    it ('should run an UPDATE query to update data on the habits table', async (done) => {
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

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_3: 'g',
        habit_4: 'h'
      };
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is not of type object', (done) => {
      const id = 1;
      const data = 'efgh';
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      let id;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_3: 'g',
        habit_4: 'h'
      };
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow('Missing argument(s)');
      done();
    });    

    it ('should throw an error if data is undefined', (done) => {
      const id = 1;
      let data;
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow('Missing argument(s)');
      done();
    }); 

    it ('should not throw an error if some values are undefined', (done) => {
      const id = 1;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
      };
      const data2 = {
        habit_3: 'g',
        habit_4: 'h',
      };

      const updateHabitTest = () => habits.update(id, data);
      const updateHabitTest2 = () => habits.update(id, data2);

      expect(updateHabitTest2).not.to.throw();
      expect(updateHabitTest).not.to.throw();
      done();
    });    
  });
  
  describe ('delete', () => {
    it ('should run a DELETE query to delete data from the habits table', async (done) => {
      const id = 1;
      const deleteTest = await habits.delete(id);

      expect(deleteTest).to.equal('DELETE FROM habits WHERE id = 1');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const deleteTest = () => habits.delete();

      expect(deleteTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const deleteTest = () => habits.delete(id);

      expect(deleteTest).toThrow('Invalid argument type');
      done();
    });
  });
});
