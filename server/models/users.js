import bcrypt from 'bcrypt';
import { development } from '../configs/configs.routes';

const environment = process.env.NODE_ENV;
const stage = development;

let

// schema maps to a collection

const usersTab = [
    {
        id: 1, email: 'premices.tuvere@gmail.com', firstName: 'premices', lastName: 'nzanzu kamasuwa', password: 'PRK781227prk', isModified: false, isNew: true,
    },
];

// function to insert a user

const insertUser = ( email,firstName,lastName,password ) =>{
    const buff = {
        id: usersTab[usersTab.length-1].id+1, email: email, firstName: firstName, lastName: lastName, password: password, isModified: false, isNew: true,
    };

    usersTab.push(buff);
};

// encrypt password before save
usersTab.forEach((user) => {
    if (!user.isModified && user.isNew) { // don't rehash if it's an old user
        bcrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
            if (err) {
                console.log('Error hashing password for user', user.name);
            } else {
                user.password = hash;
            }
        });
    }
});
export default usersTab;
