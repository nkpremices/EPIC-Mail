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

const querryDb = {
    /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    console.log(2);
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};

/**
 * Create Tables
 */
const createTables = () => {
    const queryText = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(128) NULL,
      lastName VARCHAR(128) NULL,
      userName VARCHAR(128) NULL,
      email VARCHAR(128) UNIQUE NULL,
      password VARCHAR(128) NULL,
      isAdmin BOOLEAN DEFAULT FALSE
    );`;
    querryDb.query(queryText);
};


export {
    createTables,
    querryDb,
};
