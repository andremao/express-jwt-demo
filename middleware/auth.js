const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const SECRET_KEY = String(
  fs.readFileSync(path.resolve(__dirname, '../secret.key')),
).trim();
console.log('SECRET_KEY:', SECRET_KEY);

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token);
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);
      req.uid = decoded.uid;
    } catch (err) {
      res.send({ code: 422, msg: 'token invalid.' });
      return;
    }
    next();
  };
};
