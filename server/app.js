require('../database/index');
const express = require('express');
const path = require('path');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('*', require('./middleware/checkId'));
app.use('/api/add', require('./middleware/checkDayVal'));
app.use('*', require('./middleware/checkData'));
app.use('/api', require('./routes/routes.js'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
