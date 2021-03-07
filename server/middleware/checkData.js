const checkData = (req, res, next) => {
  const data = req.body;
  const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (req.baseUrl.includes('add') || req.baseUrl.includes('update')) {
    if (req.baseUrl.includes('add')) {
      if (data.habit_1 == undefined || data.habit_2 == undefined || data.habit_3 == undefined || data.habit_4 == undefined) {
        return res.status(400).send('Missing required value(s)');
      }
    }   
    for (let key in data) {
      if (key.includes('habit') || key.includes('time')) {
        if (typeof data[key] !== 'string') {
          return res.status(400).send('INVALID DATA TYPE');
        }
        if (key.includes('time') && !timeFormat.test(data[key])) {
          return res.status(400).send('INVALID TIME FORMAT');
        }
      }
      if (key.includes('day')) {
        if (typeof data[key] !== 'boolean') {
          return res.status(400).send('INVALID DATA TYPE');
        }
      }
    }
  }
  next();
};
module.exports = checkData;
