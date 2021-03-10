const checkDayVal = (req, res, next) => {
  const data = req.body;
  let day = false;
  
  for (let key in data) {
      if (key.includes('day')) {
          if (data[key]) {
            day = true;
          }
    }
  }

  if (!day) {
    return res.status(400).send('Atleast one day must be true');
  }
  
  next();
}
;
module.exports = checkDayVal;
