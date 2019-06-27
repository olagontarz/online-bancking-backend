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
  ['user016', 'password016'],
  ['user017', 'password017'],
  ['user018', 'password018'],
  ['user019', 'password019'],
  ['user020', 'password020'],
  ['user021', 'password021'],
  ['user022', 'password022'],
  ['user023', 'password023'],
  ['user024', 'password024'],
  ['user025', 'password025'],
  ['user026', 'password026'],
  ['user027', 'password027'],
  ['user028', 'password028'],
  ['user029', 'password029'],
  ['user030', 'password030'],
]);

const exist = (login) => {
  return users.has(login);
};

const validate = (login, password) => {
  return exist(login) && users.get(login) === password;
};

module.exports = { exist, validate };
