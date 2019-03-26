const env = process.env.NODE_ENV || 'dev'; // 'dev' or 'prod'

const dev = {
  app: {
    port: 3000,
    debug: true,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
};

const prod = {
  app: {
    port: parseInt(process.env.APP_PORT, 10),
    debug: process.env.APP_DEBUG === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
};

const config = {
  dev,
  prod,
};

module.exports = config[env];
