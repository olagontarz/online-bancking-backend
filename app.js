require('log-timestamp');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const auth = require('./auth.js');

const app = express();

morgan.format('format', '[:date[iso]] ":method :url" :status - :response-time ms - :res[content-length] - :remote-addr');
app.use(morgan('format', { stream: process.stdout }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: '200000' }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.type === 'entity.parse.failed') res.status(400).send('body of request is not a JSON');
  else if (err instanceof Error && err.type === 'entity.too.large') res.status(400).send('body too large');
  else res.status(500).send();
  next();
});
app.use(cors());


const jwtsecret = 'supersecret';
const transfers = [];
const tokens = [];

app.get('/', (request, response) => {
  response.status(200).send('Ok');
});


function validateUser(login, password) {
  return login === 'admin' && password === 'admin';
}

async function generateToken(login) {
  const token = jwt.sign({ login: login.toString() }, jwtsecret);
  tokens.push(token);
  return token;
}


app.post('/users/auth', async (request, response) => {
  if (validateUser(request.body.username, request.body.password)) {
    const token = await generateToken(request.body.username);
    const user = {
      id: 1,
      username: request.body.username,
      password: request.body.password,
      token,
    };
    console.log(user);
    response.send({ user });
  } else {
    // 400 bad request
    response.status(400).send({ error: 'Username or password is incorrect' });
  }
});


app.post('/transfers', auth, (request, response) => {
  transfers.push(request.body);
  setTimeout(() => {
    response.send(request.body);
  }, 2000);
});


app.get('/transfers/:user', auth, (request, response) => {
  response.status(200).send(transfers);
});


app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.log('Something bad happened', err);
  return console.log('Server is listening on port 3000');
});
