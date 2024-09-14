import { Sequelize } from 'sequelize';
//import configData from './config/config.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('./config/config.json');
const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const env = process.env.NODE_ENV || 'development';
const config = configData[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port
  }
);

export default sequelize;
