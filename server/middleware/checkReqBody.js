const checkReqBody = (req, res, next) => {
  const data = req.body;
  const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

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
  next();
};
module.exports = checkReqBody;
