const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/user.js');
const transferRouter = require('./routes/transfer.js');

const app = express();

app.use(bodyParser.json({ limit: '200000' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('[:date[iso]] ":method :url" :status - :response-time ms'));

app.use((err, request, response, next) => {
  console.error(err.stack);
  response.status(500).send('Something went wrong!!');
});

app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('Works OK');
});

app.use(userRouter);
app.use(transferRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.log('Something bad happened', err);
  else console.log('Server is listening on port 3000');
});
