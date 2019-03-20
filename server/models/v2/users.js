import bcrypt from 'bcrypt';
import configs from '../../config/config';
import { querryDb } from '../../../db';
import {
    findAll,
    insertUser,
} from '../../helpers/v2/queries';

'use strict';// eslint-disable-line 

// a schema of all the users

// a data structure for storing all the users

const usersStorage = async () => querryDb.query(findAll('users'));
// a function to save a user when requested
const saveUser = (firstName, lastName,
    userName, email, password) => new Promise((resolve, reject) => {
    // creating a temp user
    // eslint-disable-next-line no-unused-expressions
    const tempUser = [firstName, lastName,
        userName, email, password, true];

    // hashing password before storing
    bcrypt.hash(password, configs.development.saltingRounds,
        async (err, hash) => {
            if (err) reject(err);
            else {
                tempUser[4] = hash;
                tempUser[5] = false;

                try {
                    console.log(1);
                    const { rows } = await querryDb.query(insertUser, tempUser);
                    console.log(rows[0]);
                    resolve(rows[0]);
                } catch (error) {
                    reject(error);
                }
            }
        });
});

const findUser = (userNameEmail, password) => new Promise((resolve, reject) => {
    // finding a user by his email or username
    const tempUser = usersStorage.find(el => el.userName === userNameEmail)
    || usersStorage.find(el => el.email === userNameEmail);

    // seing if the password matches
    bcrypt.compare(password, tempUser.password).then((match) => {
        if (match) {
            resolve(tempUser);
        } else {
            const error = {
                status: 500,
                error: 'Authentication error',
            };
            reject(error);
        }
    });
});

export { saveUser, findUser, usersStorage };
