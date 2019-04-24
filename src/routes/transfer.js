const express = require('express');

const auth = require('../middlewares/auth');

const router = new express.Router();

const transfers = new Map();
transfers.set('admin', []);
transfers.set('ola', []);
transfers.set('ryszard', []);
transfers.set('user001', []);
transfers.set('user002', []);
transfers.set('user003', []);
transfers.set('user004', []);
transfers.set('user005', []);
transfers.set('user006', []);
transfers.set('user007', []);
transfers.set('user008', []);
transfers.set('user009', []);
transfers.set('user010', []);
transfers.set('user011', []);
transfers.set('user012', []);
transfers.set('user013', []);
transfers.set('user014', []);
transfers.set('user015', []);

router.post('/transfers', auth, (request, response) => {
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
