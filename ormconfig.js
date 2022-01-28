const path = require('path');
require('dotenv/config');

function env(key) {
  return process.env[key];
}
const baseConfig = {
  type: env('DB_DIALECT'),
  database: env('DB_DATABASE'),
  entities: [
    path.join(__dirname, 'src', 'database', 'entities', '*.entity{.ts,.js}'),
  ],
  migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.ts')],
  logging: ['warn', 'error'],
  cli: {
    migrationsDir: path.join('src', 'database', 'migrations'),
  },
  seeds: [path.join(__dirname, 'src', 'database', 'seeds', '*.seed{.ts,.js}')],
  factories: [
    path.join(__dirname, 'src', 'database', 'factories', '*.factory{.ts,}'),
  ],
};

if (process.env.NODE_ENV !== 'test') {
  module.exports = {
    host: env('DB_HOST'),
    port: env('DB_PORT'),
    username: env('DB_USERNAME'),
    password: env('DB_PASSWORD'),
    synchronize: false,
    ...baseConfig,
  };
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  };
}
