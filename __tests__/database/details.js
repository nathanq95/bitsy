const Details = require('../../database/methods/details');

jest.mock('../../database/index', () => {
  const client = {
    query: jest.fn((str) => str)
  }

  return client;
});

describe ('details table methods', () => {
  const details = new Details();

  describe('add', () => {
    it ('should run an INSERT query on the details table', async (done) => {
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
      const addDetailsTest = await details.add(data);

      expect(addDetailsTest).to.equal("INSERT INTO details(day_0, day_1, day_2, day_3, day_4, day_5, day_6, time_1, time_2, time_3, time_4) VALUES ('true', 'true', 'true', 'true', 'true', 'true', 'true', '16:00', '17:00', '18:00', '19:00')");
      done();
    });

    it ('should throw an error if all day values are false', (done) => {
      const data = {
        day_0: false,
        day_1: false,
        day_2: false,
        day_3: false,
        day_4: false,
        day_5: false,
        day_6: false,
        time_1: '16:00',
        time_2: '17:00',
        time_3: '18:00',
        time_4: '19:00'
      };
      const addDetailsTest = () => details.add(data);

      expect(addDetailsTest).toThrow('At least one day must have a value of true');
      done();
    });

    it ('should throw an error if data is not of type object', (done) => {
      const data = 'abcd';

      const addDetailsTest = () => details.add(data);

      expect(addDetailsTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is undefined', (done) => {
      const addDetailsTest = () => details.add();

      expect(addDetailsTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if an expected day value is undefined', (done) => {
      const data = {
        day_0: true,
        day_1: true,
        day_2: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '16:00',
        time_2: '17:00',
        time_3: '18:00',
        time_4: '19:00'
      };

      const addDetailsTest = () => details.add(data);

      expect(addDetailsTest).toThrow('Missing required value(s)');
      done();
    });

    it ('should throw an error if an expected time value is undefined', (done) => {
      const data = {
        day_0: true,
        day_1: true,
        day_2: true,
        day_3: true,
        day_4: true,
        day_5: true,
        day_6: true,
        time_1: '16:00',
        time_3: '18:00',
        time_4: '19:00'
      };

      const addDetailsTest = () => details.add(data);

      expect(addDetailsTest).toThrow('Missing required value(s)');
      done();
    });

    it ('should throw an error if all expected values are undefined', (done) => {
      const data = {
        day_7: true,
        day_8: true,
        day_9: true,
        day_10: true,
        day_11: true,
        day_12: true,
        day_13: true,
        time_5: '16:00',
        time_6: '17:00',
        time_7: '18:00',
        time_8: '19:00'
      };

      const addDetailsTest = () => details.add(data)

      expect(addDetailsTest).toThrow('Missing required value(s)');
      done();
    });
  });

  describe ('get', () => {
    it ('should run a SELECT query on the details table', async (done) => {
      const day = 1;
      const getDetailsTest = await details.get(day);

      expect(getDetailsTest).to.equal('SELECT id, current_habit, time_1, time_2, time_3, time_4 FROM details WHERE day_1 = true');
      done();
    });

    it ('should throw an error if data is not of type number', (done) => {
      const day = '1';

      const getDetailsTest = () => details.get(day);

      expect(getDetailsTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is undefined', (done) => {
      const getDetailsTest = () => details.get();

      expect(getDetailsTest).toThrow('Missing argument');
      done();
    });
  });

  describe ('update', () => {
    it ('should run an UPDATE query on the details table', async (done) => {
      const id = 1;
      const data = {
        day_0: true,
        day_1: false,
        day_2: true,
        day_3: false,
        day_4: true,
        day_5: false,
        day_6: true,
        time_1: '01:00',
        time_2: '02:00',
        time_3: '03:00',
        time_4: '04:00'
      };

      const updateTest = await details.update(id, data);

      expect(updateTest).to.equal("UPDATE details SET  time_1 = '01:00' , time_2 = '02:00' , time_3 = '03:00' , time_4 = '04:00' , day_0 = true , day_1 = false , day_2 = true , day_3 = false , day_4 = true , day_5 = false , day_6 = true  WHERE id = 1");
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const data = {
        day_0: true,
        day_1: false,
        day_2: true,
        day_3: false,
        day_4: true,
        day_5: false,
        day_6: true,
        time_1: '01:00',
        time_2: '02:00',
        time_3: '03:00',
        time_4: '04:00'
      };

      const updateTest = () => details.update(id, data);
      
      expect(updateTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if data is not of type object', (done) => {
      const id = 1;
      const data = 'abcd';

      const updateTest = () => details.update(id, data);
      
      expect(updateTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      let id;
      const data = {
        day_0: true,
        day_1: false,
        day_2: true,
        day_3: false,
        day_4: true,
        day_5: false,
        day_6: true,
        time_1: '01:00',
        time_2: '02:00',
        time_3: '03:00',
        time_4: '04:00'
      };

      const updateTest = () => details.update(id, data);
      
      expect(updateTest).toThrow('Missing argument(s)');
      done();
    });

    it ('should throw an error if data is undefined', (done) => {
      const id = 1;
      let data;

      const updateTest = () => details.update(id, data);
      
      expect(updateTest).toThrow('Missing argument(s)');
      done();
    });

    it ('should not throw an error if some values are undefined', (done) => {
      const id = 1;
      const data = {
        day_0: true,
        day_1: false,
        day_2: true,
        day_4: true,
        day_5: false,
        day_6: true,
      };
      const data2 = {
        time_1: '01:00',
        time_2: '02:00',
        time_3: '03:00',
        time_4: '04:00'
      }

      const updateTest = () => details.update(id, data);
      const updateTest2 = () => details.update(id, data2);
      
      expect(updateTest).to.not.throw();
      expect(updateTest2).to.not.throw();
      done();
    });
  });

  describe ('updateCurrent', () => {
    it ('should run an UPDATE query on the details table', async (done) => {
      const id = 1;
      const incrementtest = await details.updateCurrent(id);

      expect(incrementtest).to.equal('UPDATE details SET current_habit = current_habit + 1 WHERE id = 1');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';
      const incrementtest = () => details.updateCurrent(id);

      expect(incrementtest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const incrementtest = () => details.updateCurrent();

      expect(incrementtest).toThrow('Missing argument');
      done();
    });
  });

  describe ('delete', () => {
    it ('should run a DELETE query on the details table', async (done) => {
      const id = 1;
      const deleteTest = await details.delete(id);

      expect(deleteTest).to.equal('DELETE FROM details WHERE id = 1');
      done();
    });

    it ('should throw an error if id is not of type number', async (done) => {
      const id = '1';
      const deleteTest = () => details.delete(id);

      expect(deleteTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const deleteTest = () => details.delete();

      expect(deleteTest).toThrow('Missing argument');
      done();
    });
  });
});
