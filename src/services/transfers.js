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
  ['user011', []],
  ['user012', []],
  ['user013', []],
  ['user014', []],
  ['user015', []],
  ['user016', []],
  ['user017', []],
  ['user018', []],
  ['user019', []],
  ['user020', []],
  ['user021', []],
  ['user022', []],
  ['user023', []],
  ['user024', []],
  ['user025', []],
  ['user026', []],
  ['user027', []],
  ['user028', []],
  ['user029', []],
  ['user030', []],
]);

const add = (login, transfer) => {
  transfers.get(login).push(transfer);
};

const get = (login) => {
  return transfers.get(login);
};

module.exports = { add, get };
