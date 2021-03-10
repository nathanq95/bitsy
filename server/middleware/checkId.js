const checkId = (req, res, next) => {
  if (req.baseUrl.includes('update') || req.baseUrl.includes('overview') || req.baseUrl.includes('complete') || req.baseUrl.includes('undo') || req.baseUrl.includes('delete')) {
    if (!req.body.id) {
      return res.status(400).send('MISSING id IN REQUEST BODY');
    }
    if (typeof req.body.id !== 'number') {
      return res.status(400).send('INVALID DATA TYPE');
    }
  }
  next();
};

module.exports = checkId;