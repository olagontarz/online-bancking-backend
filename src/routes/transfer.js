const express = require('express');

const auth = require('../middlewares/auth');
const transfers = require('../services/transfers');

const router = new express.Router();

router.post('/transfers', auth, (request, response) => {
  transfers.add(request.login, request.body);
  // timeout to simulate transfer operation
  setTimeout(() => {
    response.send(request.body);
  }, 2000);
});

router.get('/transfers/:user', auth, (request, response) => {
  response.status(200).send(transfers.get(request.login));
});

module.exports = router;
