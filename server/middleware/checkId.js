const checkId = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).send('MISSING id IN REQUEST BODY');
  }
  if (typeof req.body.id !== 'number') {
    return res.status(400).send('INVALID DATA TYPE');
  }
  next();
};

module.exports = checkId;