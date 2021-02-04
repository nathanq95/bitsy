const express = require('express');

const router = express.Router();

router.route('/add')
  .get((req, res) => {
    res.send('hello from the server!').status(200);
  });

module.exports = router;
