const { expect } = require('chai');
const Details = require('../../database/methods/details');

describe ('details table methods', () => {
  const details = new Details();

  describe('add', () => {
    it ('should insert into the details table', async (done) => {
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
  });

  describe ('get', () => {
    it ('should return data', async (done) => {
      const day = 1;
      const getDetailsTest = await details.get(day);

      expect(getDetailsTest).to.equal('SELECT id, current_habit, time_1, time_2, time_3, time_4 FROM details WHERE day_1 = true');
      done();
    });
  });

  describe ('update', () => {
    it ('should update values', async (done) => {
      const id = 1;
      const data = {
        time_1: '12:00',
        day_0: false
      };
      const updateTest = await details.update(id, data);

      expect(updateTest).to.equal("UPDATE details SET  time_1 = '12:00' , day_0 = false  WHERE id = 1");
      done();
    });
  });

  describe ('updateCurrent', () => {
    it ('should update the current habit', async (done) => {
      const id = 1;
      const incrementtest = await details.updateCurrent(id);

      expect(incrementtest).to.equal('UPDATE details SET current_habit = current_habit + 1 WHERE id = 1');
      done();
    });
  });

  describe ('delete', () => {
    it ('should delete data from the details table', async (done) => {
      const id = 1;
      const deleteTest = await details.delete(id);

      expect(deleteTest).to.equal('DELETE FROM details WHERE id = 1');
      done();
    });
  });
});
