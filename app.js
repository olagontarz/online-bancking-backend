require('log-timestamp');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

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


const transfers = [];


app.get('/', (request, response) => {
  response.statusCode = 200;
  response.send('Ok');
});


app.post('/users/auth', (request, response) => {
  console.log(request.body.username);
  if (request.body.username === 'admin' && request.body.password === 'admin') {
    const body = {
      id: 1,
      username: request.body.username,
      password: request.body.password,
      token: 'fake-jwt-token',
    };
    response.status(200);
    response.json(body);
  } else {
    // else return 400 bad request
    response.status(400);
    response.send('Username or password is incorrect');
  }
});


app.post('/transfers', (request, response) => {
  transfers.push(request.body);
  setTimeout(() => {
    response.statusCode = 200;
    response.json('request.body');
  }, 2000);
});


app.get('/transfers/:user', (request, response) => {
  const { user } = request.params.user;
  console.log(user);
  response.statusCode = 200;
  response.json(transfers);
});


app.listen(process.env.PORT || 4000, (err) => {
  if (err) return console.log('Something bad happened', err);
  return console.log('Server is listening on port 3000');
});
