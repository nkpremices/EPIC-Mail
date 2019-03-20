import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(128) NOT NULL,
      lastName VARCHAR(128) NOT NULL,
      password VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    );`;

    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

exports = {
    createTables,
};
