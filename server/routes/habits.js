const express = require('express');

const { addHabit, getHabitOverview } = require('../../database/methods/habits');
const { addDetails, getDetails } = require('../../database/methods/details');
const { initProgress, getTodaysProgress } = require('../../database/methods/progress');

const router = express.Router();

router.route('/add')
  .post(async (req, res) => {
    try {
      const habitData = {
        goal_habit: req.body.goal_habit,
        habit_1: req.body.habit_1,
        habit_2: req.body.habit_2,
        habit_3: req.body.habit_3,
      };
      const detailsData = {
        current_habit: req.body.habit_1,
        day_1: req.body.day_1,
        day_2: req.body.day_2,
        day_3: req.body.day_3,
        day_4: req.body.day_4,
        day_5: req.body.day_5,
        day_6: req.body.day_6,
        day_7: req.body.day_7,
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

      for(let i = 0; i < detailsData.rows.length; i++) {
        let data = await getTodaysProgress(detailsData.rows[i].id);

        progressData.push(data.rows[0]);
      }
      
      res.send({progressData: progressData, detailsData: detailsData.rows}).status(200);
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

router.route('/overview')
  .get(async (req, res) => {
    try {
      const id = req.body.id;
      const overviewData = await getHabitOverview(id);
      res.send(overviewData.rows[0]).status(200);
    } catch (err) {
      res.status(500).send(`INTERNAL SERVER ERROR: ${err}`);
    }
  });

module.exports = router;
