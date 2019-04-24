const express = require('express');

const auth = require('../middlewares/auth');

const router = new express.Router();


const transfers = new Map();
transfers.set('admin', []);
transfers.set('ola', []);
transfers.set('ryszard', []);

router.post('/transfers', auth, (request, response) => {
  console.log(request.login);
  console.log(request.login);
  transfers.get(request.login).push(request.body);
  setTimeout(() => {
    response.send(request.body);
  }, 2000);
});


// route parameters
router.get('/transfers/:user', auth, (request, response) => {
  console.log(transfers);
  response.status(200).send(transfers.get(request.login));
});


module.exports = router;
