import bcrypt from 'bcrypt';
import configs from '../../config/config';
import { querryDb } from '../../helpers/v2/db';
import {
    insertUser,
    findUserByEmail,
    setUserLogedIn,
} from '../../helpers/v2/queries';

// a schema of all the users

// a data structure for storing all the users


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
            if (err && (await querryDb
                .query(findUserByEmail(email)))) reject(err);
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

const findUser = (userNameEmail,
    password) => new Promise(async (resolve, reject) => {
    // finding a user by his email or username
    const tempUser = await querryDb.query(findUserByEmail(userNameEmail));
    try {
        bcrypt.compare(password, tempUser.rows[0].password).then((match) => {
            if (match) {
                resolve(tempUser.rows[0]);
                querryDb.query(setUserLogedIn(tempUser.rows[0].id));
            } else {
                const error = {
                    status: 500,
                    error: 'Authentication error',
                };
                reject(error);
            }
        });
    } catch (TypeError) {
        const error = {
            status: 500,
            error: 'Enter the email please',
        };
        reject(error);
    }
    console.log(tempUser.rows);
    // seing if the password matches
});

export { saveUser, findUser };
