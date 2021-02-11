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
app.use('/api/add', require('./middleware/checkData'));
app.use('/api/update', require('./middleware/checkId'));
app.use('/api/update', require('./middleware/checkData'));
app.use('/api/overview', require('./middleware/checkId'));
app.use('/api/complete', require('./middleware/checkId'));
app.use('/api/undo', require('./middleware/checkId'));
app.use('/api/delete', require('./middleware/checkId'));
app.use('/api', require('./routes/habits.js'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

module.exports = app;
