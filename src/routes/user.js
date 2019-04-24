const express = require('express');
const jwt = require('jsonwebtoken');

const users = require('../users');

const router = new express.Router();

const jwtsecret = 'supersecret';
const tokens = [];


async function generateToken(login) {
  const token = jwt.sign({ login: login.toString() }, jwtsecret);
  tokens.push(token);
  return token;
}


router.post('/users/auth', async (request, response) => {
  if (users.validate(request.body.username, request.body.password)) {
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
