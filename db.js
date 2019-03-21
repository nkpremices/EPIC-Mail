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
        console.log(text);
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
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
    const usersTable = `CREATE TABLE IF NOT EXISTS
    users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(128) NULL,
      lastName VARCHAR(128) NULL,
      userName VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN DEFAULT FALSE,
      isLogedIn BOOLEAN DEFAULT FALSE
    );`;

    const messagesTable = `CREATE TABLE IF NOT EXISTS
    messages(
      id SERIAL PRIMARY KEY,
      senderId INTEGER REFERENCES users(id) NOT NULL,
      receiverId INTEGER REFERENCES users(id) NOT NULL,
      parentMessageId INTEGER DEFAULT 0,
      subject VARCHAR(128) NOT NULL,
      text TEXT NOT NULL,
      status VARCHAR(10) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      isread BOOLEAN DEFAULT FALSE
    );`;
    querryDb.query(usersTable);
    querryDb.query(messagesTable);
};


export {
    createTables,
    querryDb,
};
