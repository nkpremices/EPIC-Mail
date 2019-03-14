import bcrypt from 'bcrypt';
import configs from '../config/config';

// a schema of all the users
class UsersSchema {
    constructor(id,
        email, userName,
        firstName, lastName,
        password, isNew) {
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.isNew = isNew;
    }
}

// a data structure for storing all the users

const usersStorage = [];
let id = 0;

// a function to save a user when requested
const saveUser = (email, userName, firstName,
    lastName, password) => new Promise((resolve, reject) => {
    // creating a temp user
    // eslint-disable-next-line no-unused-expressions
    const tempUser = new UsersSchema(id += 1,
        email, userName, firstName, lastName, password, true);

    // hashing password before storing
    bcrypt.hash(password, configs.development.saltingRounds,
        (err, hash) => {
            if (err) reject(err);
            else {
                tempUser.password = hash;
                tempUser.isNew = false;
                usersStorage.push(tempUser);
                console.log(usersStorage);
                resolve(usersStorage[usersStorage.length - 1]);
            }
        });
});

export { saveUser };// eslint-disable-line 
