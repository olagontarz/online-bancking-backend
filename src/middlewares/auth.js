const jwt = require('jsonwebtoken');

const users = require('../services/users');

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'supersecretjwtkey');
    if (users.exist(decoded.login)) {
      request.login = decoded.login;
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    response.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
