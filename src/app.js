require('log-timestamp');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/user.js');
const transferRouter = require('./routes/transfer.js');

const app = express();


morgan.format('format', '[:date[iso]] ":method :url" :status - :response-time ms');
app.use(morgan('format', { stream: process.stdout }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '200000' }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.type === 'entity.parse.failed') res.status(400).send('body of request is not a JSON');
  else if (err instanceof Error && err.type === 'entity.too.large') res.status(400).send('body too large');
  else res.status(500).send();
  next();
});

app.use(cors());

app.use(userRouter);
app.use(transferRouter);

app.get('/', async (request, response) => {
  response.status(200).send('Ok');
});


app.listen(process.env.PORT || 3000, (err) => {
  if (err) return console.log('Something bad happened', err);
  return console.log('Server is listening on port 3000');
});
