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
]);

const exist = (login) => {
  return users.has(login);
};

const validate = (login, password) => {
  return exist(login) && users.get(login) === password;
};

module.exports = { exist, validate };
