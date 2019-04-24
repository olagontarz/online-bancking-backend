const express = require('express');
const jwt = require('jsonwebtoken');

const router = new express.Router();

const jwtsecret = 'supersecret';
const tokens = [];

const users = new Map([
  ['admin', 'admin'],
  ['ola', 'ola'],
  ['ryszard', 'ryszard'],
  ['user001', 'password001'],
  ['user002', 'password002'],
  ['user003', 'password003'],
  ['user004', 'password004'],
  ['user005', 'password005'],
  ['user006', 'password006'],
  ['user007', 'password007'],
  ['user008', 'password008'],
  ['user009', 'password009'],
  ['user010', 'password010'],
  ['user011', 'password011'],
  ['user012', 'password012'],
  ['user013', 'password013'],
  ['user014', 'password014'],
  ['user015', 'password015'],
]);

function validateUser(login, password) {
  if (userExist(login) && users.get(login) === password) return true;
  return false;
}

function userExist(login) {
  return users.has(login);
}

async function generateToken(login) {
  const token = jwt.sign({ login: login.toString() }, jwtsecret);
  tokens.push(token);
  return token;
}


router.post('/users/auth', async (request, response) => {
  if (validateUser(request.body.username, request.body.password)) {
    const token = await generateToken(request.body.username);
    const user = {
      id: 1,
      username: request.body.username,
      password: request.body.password,
      token,
    };
    console.log(user);
    response.send({
      user,
    });
  } else {
    // 400 bad request
    response.status(400).send({
      error: 'Username or password is incorrect',
    });
  }
});


module.exports = router;
