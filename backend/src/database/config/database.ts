import 'dotenv/config';
import { SequelizeOptions  } from 'sequelize-typescript';

const config: SequelizeOptions = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'project', // substitua o nome do banco quando for utilizar em seu projeto!
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres'
};

export = config;