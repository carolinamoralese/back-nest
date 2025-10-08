import * as dotenv from 'dotenv';
import { User } from './src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Product } from './src/entities/product.entity';
dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  entities: [User, Product],
  migrations: ['./src/migrations/*.ts'],
});
