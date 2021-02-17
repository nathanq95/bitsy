const Habits = require('../../database/methods/habits');

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

    it ('should throw an error if some data is undefined', async (done) => {
      const data = {
        habit_1: 'a',
        habit_3: 'c',
        habit_4: 'd'
      }

      const addHabitTest = () => habits.add(data);

      expect(addHabitTest).toThrow();
      done();
    });

    it ('should throw an error if all data is undefined', async (done) => {
      const addHabitTest = () => habits.add();

      expect(addHabitTest).toThrow();
      done();
    });

    it ('should throw an error if argument is not of type object', async (done) => {
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

    it ('should throw an error if id is undefined', async (done) => {
      let id;
      const getOverviewTest = () => habits.getOverview(id);

      expect(getOverviewTest).toThrow();
      done();
    });

    it ('should throw an error if id is not of type number', async (done) => {
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

    it ('should throw an error if id is not of type number', async (done) => {
      const id = '1';
      const data = 2;

      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is not of type number', async (done) => {
      const id = 1;
      const data = '2';

      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id & data are undefined', async (done) => {
      let id, data;
      const getCurrentHabitTest = () => habits.getCurrent(id, data);

      expect(getCurrentHabitTest).toThrow();
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

    it ('should throw an error if id is not of type number', async (done) => {
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

    it ('should throw an error if data is not of type object', async (done) => {
      const id = 1;
      const data = 'efgh';
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', async (done) => {
      let id;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_3: 'g',
        habit_4: 'h'
      };
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow();
      done();
    });    

    it ('should throw an error if data is undefined', async (done) => {
      const id = 1;
      let data;
      const updateHabitTest = () => habits.update(id, data);

      expect(updateHabitTest).toThrow();
      done();
    }); 

    it ('should not throw an error if some data is undefined', async (done) => {
      const id = 1;
      const data = {
        habit_1: 'e',
        habit_2: 'f',
        habit_4: 'h'
      };
      const updateHabitTest = () => habits.update(id, data);

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

    it ('should throw an error if id is undefined', async (done) => {
      let id;
      const deleteTest = () => habits.delete(id);

      expect(deleteTest).toThrow();
      done();
    });

    it ('should throw an error if id is not of type number', async (done) => {
      const id = '1';
      const deleteTest = () => habits.delete(id);

      expect(deleteTest).toThrow('Invalid argument type');
      done();
    });
  });
});
