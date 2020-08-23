const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const mw = require('./middleware');

const app = express();

const SECRET_KEY = String(fs.readFileSync('secret.key')).trim();
console.log('SECRET_KEY:', SECRET_KEY);

app.get('/', (req, res) => {
  res.send('ok');
});

app.post('/login', express.json(), (req, res) => {
  console.log(req.body);
  const token = jwt.sign({ uid: 1 }, SECRET_KEY, { expiresIn: '30m' });
  console.log(token);
  res.send('login ok');
});

app.get('/profile', mw.auth(), (req, res) => {
  console.log('uid:', req.uid);
  res.send('profile ok');
});

app.listen(3000, () => {
  console.log('App started at http://localhost:3000');
});
