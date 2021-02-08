const express = require('express');

const { addHabit, getHabitOverview, getCurrentHabit, updateHabit, deleteHabit } = require('../../database/methods/habits');
const { addDetails, getDetails, updateDetails, updateCurrentHabit, deleteDetails } = require('../../database/methods/details');
const { initProgress, getTodaysProgress, completeHabit, undoComplete, resetProgress, deleteProgress } = require('../../database/methods/progress');

const router = express.Router();

router.route('/add')
  .post(async (req, res) => {
    try {
      const habitData = {
        habit_1: req.body.habit_1,
        habit_2: req.body.habit_2,
        habit_3: req.body.habit_3,
        habit_4: req.body.habit_4,
      };
      const detailsData = {
        day_0: req.body.day_0,
        day_1: req.body.day_1,
        day_2: req.body.day_2,
        day_3: req.body.day_3,
        day_4: req.body.day_4,
        day_5: req.body.day_5,
        day_6: req.body.day_6,
        time_1: req.body.time_1,
        time_2: req.body.time_2,
        time_3: req.body.time_3,
        time_4: req.body.time_4,
      };
      await addHabit(habitData);
      await addDetails(detailsData);
      await initProgress();
      res.send('OK').status(201);
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/today')
  .get(async (req, res) => {
    try {
      const date = new Date();
      const today = date.getDay();
      const detailsData = await getDetails(today);
      const progressData = [];
      const habitData = [];

      for (let i = 0; i < detailsData.rows.length; i += 1) {
        const { id } = detailsData.rows[i];
        const data = await getTodaysProgress(id);
        const data2 = await getCurrentHabit(id, detailsData.rows[i].current_habit);
        habitData.push(data2.rows[0]);
        progressData.push(data.rows[0]);
      }

      res.send({ progressData, detailsData: detailsData.rows, habitData }).status(200);
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/overview')
  .get(async (req, res) => {
    try {
      const { id } = req.body;
      const overviewData = await getHabitOverview(id);
      res.send(overviewData.rows[0]).status(200);
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/complete')
  .patch(async (req, res) => {
    try {
      const { id } = req.body;
      const streak = await completeHabit(id, req.body.completed);

      if (streak.rows[0].streak > 5) {
        await updateCurrentHabit(id);
        await resetProgress(id);
      }
      res.status(201).send('OK');
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/undo')
  .patch(async (req, res) => {
    try {
      const { id } = req.body;
      await undoComplete(id);
      res.status(201).send('OK');
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/update')
  .patch(async (req, res) => {
    try {
      const data = req.body;
      if (data.habit_1 || data.habit_2 || data.habit_3 || data.habit_4) {
        await updateHabit(data.id, data);
      }
      if (data.time_1 || data.time_2 || data.time_3 || data.time_4 || data.day_1 || data.day_2 || data.day_3 || data.day_4 || data.day_5 || data.day_6 || data.day_7) {
        await updateDetails(data);
      }
      res.status(201).send('OK');
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/delete')
  .delete(async (req, res) => {
    try {
      const { id } = req.body;
      await deleteDetails(id);
      await deleteProgress(id);
      await deleteHabit(id);
      res.status(201).send('OK');
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

module.exports = router;
