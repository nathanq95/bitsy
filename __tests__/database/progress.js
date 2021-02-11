const { expect } = require('chai');
const Progress = require('../../database/methods/progress');

describe ('progress table methods', () => {
  const progress = new Progress();

  describe ('init', () => {
    it ('should generate initial data in the progress table', async (done) => {
      const initProgressTest = await progress.init();

      expect(initProgressTest).to.equal('INSERT INTO progress(completed) VALUES(false)');
      done();
    });
  });

  describe ('get', () => {
    it ('should return all data', async (done) => {
      const id = 1;
      const getProgressTest = await progress.get(id);

      expect(getProgressTest).to.equal('SELECT * FROM progress WHERE id = 1');
      done();
    });
  });

  describe ('complete', () => {
    it ('should set the completed column to true', async (done) => {
      const id = 1;
      const completeProgressTest = await progress.complete(id);

      expect(completeProgressTest).to.equal('UPDATE progress SET completed = true, streak = streak + 1 WHERE id = 1 RETURNING streak');
      done();
    });
  });

  describe ('undoComplete', () => {
    it ('should set the completed column to false', async (done) => {
      const id = 1;
      const undoCompleteTest = await progress.undoComplete(id);

      expect(undoCompleteTest).to.equal('UPDATE progress SET completed = false, streak = streak - 1 WHERE id = 1');
      done();
    });
  });

  describe ('reset', () => {
    it ('should reset the completed & streak columns to their initial values', async (done) => {
      const id = 1;
      const resetProgressTest = await progress.reset(id);

      expect(resetProgressTest).to.equal('UPDATE progress SET completed = false, streak = 0 WHERE id = 1');
      done();
    });
  });
  
  describe ('delete', () => {
    it ('should delete data from the progress table', async (done) => {
      const id = 1;
      const deleteProgressTest = await progress.delete(id);

      expect(deleteProgressTest).to.equal('DELETE FROM progress WHERE id = 1');
      done();
    });
  });
});
