const express = require('express');
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

const users = require('../services/users');

const router = new express.Router();

const generateJwt = async (login) => {
  return jwt.sign({ login: login.toString() }, 'supersecretjwtkey');
};

router.post('/users/auth', async (request, response) => {
  if (users.validate(request.body.username, request.body.password)) {
    const token = await generateJwt(request.body.username);
    const user = {
      id: uuid(),
      username: request.body.username,
      password: request.body.password,
      token,
    };
    response.send({ user });
  } else {
    response.status(400).send({ error: 'Username or password is incorrect' });
  }
});

module.exports = router;
