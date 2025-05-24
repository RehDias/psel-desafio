import 'dotenv/config';
import { SequelizeOptions } from 'sequelize-typescript';

const config: SequelizeOptions = { 
  dialect: 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'project',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  models: [__dirname + '/models/**/*.model.ts']
};

module.exports = config;