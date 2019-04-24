const jwt = require('jsonwebtoken');
const user = require('../routes/user');

const jwtsecret = 'supersecret';

const auth = async (request, response, next) => {
  try {
    const token = request.header('Authorization').replace('Bearer ', '');
    console.log(token);
    const decoded = jwt.verify(token, jwtsecret);
    if (user.userExist(decoded.login)) {
      console.log(decoded.login);
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
