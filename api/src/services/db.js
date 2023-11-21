import { createPool } from "mysql2/promise";
import mongoose from 'mongoose';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";
import seedDB from "./seedDB.js";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
});

export const connectDB = async () => {
  try {
    const prod = false;
    const connectionString = prod ? 'mongodb://127.0.0.1:27017/produccion' : 'mongodb://127.0.0.1:27017/produccion-test'
    await mongoose.connect(connectionString);
    console.log('>>> DB is connected');
    await seedDB();
    
  } catch (error) {
    console.error('Connection to DB failed. Error: ', error);
  }
}


