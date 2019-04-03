const jwt = require('jsonwebtoken');

const jwtsecret = 'supersecret';

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const decoded = jwt.verify(token, jwtsecret);
    if (decoded.login === 'admin') {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    response.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;
