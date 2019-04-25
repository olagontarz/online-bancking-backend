const transfers = new Map([
  ['admin', []],
  ['ola', []],
  ['ryszard', []],
  ['user001', []],
  ['user002', []],
  ['user003', []],
  ['user004', []],
  ['user005', []],
  ['user006', []],
  ['user007', []],
  ['user008', []],
  ['user009', []],
  ['user010', []],
]);

const add = (login, transfer) => {
  transfers.get(login).push(transfer);
};

const get = (login) => {
  return transfers.get(login);
};

module.exports = { add, get };
