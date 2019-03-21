import { Pool } from 'pg';
import dotenv from 'dotenv';
import {
    findAll,
    findUserByName,
} from './queries';

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
    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    console.log(text);
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};

const selectMessgaes = async () => {
    const { rows } = await querryDb.query(findAll('messages'));
    return rows;
};

const selectUsers = async () => {
    const { rows } = await querryDb.query(findAll('users'));
    return rows;
};

const selectOneUserByName = async (value) => {
    const { rows } = await querryDb.query(findUserByName(value));
    return rows[0];
};

export {
    selectMessgaes,
    selectUsers,
    selectOneUserByName,
    querryDb,
};
