const users = new Map([
  ['admin', 'admin'],
  ['ola', 'ola'],
  ['ryszard', 'ryszard'],
  ['user001', 'password001'],
  ['user002', 'password002'],
  ['user003', 'password003'],
  ['user004', 'password004'],
  ['user005', 'password005'],
  ['user006', 'password006'],
  ['user007', 'password007'],
  ['user008', 'password008'],
  ['user009', 'password009'],
  ['user010', 'password010'],
  ['user011', 'password011'],
  ['user012', 'password012'],
  ['user013', 'password013'],
  ['user014', 'password014'],
  ['user015', 'password015'],
]);

function validate(login, password) {
  if (exist(login) && users.get(login) === password) return true;
  return false;
}

function exist(login) {
  console.log(users.has(login));
  return users.has(login);
}

module.exports = { validate, exist };
