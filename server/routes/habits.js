const express = require('express');

const { addHabit } = require('../../database/methods/habits');
const { addDetails } = require('../../database/methods/details');
const { initDetails } = require('../../database/methods/progress');

const router = express.Router();

router.route('/add')
  .get(async (req, res) => {
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
      await initDetails();
      res.send('OK').status(200);
    } catch (err) {
      res.send('INTERNAL SERVER ERROR: ', err).status(500);
    }
  });

module.exports = router;
