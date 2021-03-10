const Progress = require('../../database/methods/progress');

jest.mock('../../database/index', () => {
  const client = {
    query: jest.fn((str) => str)
  }

  return client;
});

describe ('progress table methods', () => {
  const progress = new Progress();

  describe ('init', () => {
    it ('should run an INSERT query on the progress table', async (done) => {
      const initProgressTest = await progress.init();

      expect(initProgressTest).to.equal('INSERT INTO progress(completed) VALUES(false)');
      done();
    });
  });

  describe ('get', () => {
    it ('should run a SELECT query on the progress table', async (done) => {
      const id = 1;
      const getProgressTest = await progress.get(id);

      expect(getProgressTest).to.equal('SELECT * FROM progress WHERE id = 1');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';

      const getProgressTest = () => progress.get(id);

      expect(getProgressTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const getProgressTest = () => progress.get();

      expect(getProgressTest).toThrow('Missing argument');
      done();
    });
  });

  describe ('complete', () => {
    it ('should run an UPDATE query on the progress table', async (done) => {
      const id = 1;
      const completeProgressTest = await progress.complete(id);

      expect(completeProgressTest).to.equal('UPDATE progress SET completed = true, streak = streak + 1 WHERE id = 1 RETURNING streak');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';

      const completeProgressTest = () => progress.complete(id);

      expect(completeProgressTest).toThrow('Invalid argument type');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const completeProgressTest = () => progress.complete();

      expect(completeProgressTest).toThrow('Missing argument');
      done();
    });
  });

  describe ('undoComplete', () => {
    it ('should run an UPDATE query on the progress table', async (done) => {
      const id = 1;
      const undoCompleteTest = await progress.undoComplete(id);

      expect(undoCompleteTest).to.equal('UPDATE progress SET completed = false, streak = streak - 1 WHERE id = 1');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const undoCompleteTest = () => progress.undoComplete();

      expect(undoCompleteTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';

      const undoCompleteTest = () => progress.undoComplete(id);

      expect(undoCompleteTest).toThrow('Invalid argument type');
      done();
    });
  });

  describe ('reset', () => {
    it ('should run an UPDATE query to reset the completed & streak columns to their initial values', async (done) => {
      const id = 1;
      const resetProgressTest = await progress.reset(id);

      expect(resetProgressTest).to.equal('UPDATE progress SET completed = false, streak = 0 WHERE id = 1');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const resetProgressTest = () => progress.reset();

      expect(resetProgressTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';

      const resetProgressTest = () => progress.reset(id);

      expect(resetProgressTest).toThrow('Invalid argument type');
      done();
    });
  });
  
  describe ('delete', () => {
    it ('should run a DELETE query on the progress table', async (done) => {
      const id = 1;
      const deleteProgressTest = await progress.delete(id);

      expect(deleteProgressTest).to.equal('DELETE FROM progress WHERE id = 1');
      done();
    });

    it ('should throw an error if id is undefined', (done) => {
      const deleteProgressTest = () => progress.delete();

      expect(deleteProgressTest).toThrow('Missing argument');
      done();
    });

    it ('should throw an error if id is not of type number', (done) => {
      const id = '1';

      const deleteProgressTest = () => progress.delete(id);

      expect(deleteProgressTest).toThrow('Invalid argument type');
      done();
    });
  });
});
