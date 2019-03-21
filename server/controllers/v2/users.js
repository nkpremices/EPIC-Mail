import joi from 'joi';
import { createToken } from '../../middlewares/v2/validators';
import { saveUser, findUser } from '../../models/v2/users';

// eslint-disable-next-line no-unused-expressions
'use strict';

const usersController = {
    // sign up part of the users controller
    signup: async (req, res) => {
        const result = {};
        let status = 200;
        const { userName, password, email } = req.body;
        // getting the body for joi validation
        const data = req.body;

        // joy validation
        const joySchema = joi.object().keys({
            // here we declare all the required fields
            userName: joi.string().min(5).required(),
            password: joi.string().min(5).alphanum().required(),
            email: joi.string().email().lowercase().required(),
        });

        joi.validate(data, joySchema, async (err) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    data: {
                        message: err.details[0].message,
                    },
                });
            } else {
                try {
                    // trying to insert a user
                    const tempUser = await saveUser('', '',
                        userName, email, password);
                    const token = createToken(tempUser);
                    result.status = status;
                    result.data = [{
                        token,
                    }];
                    res.status(status).json(result);
                } catch (error) {
                    console.log(error);
                    const errorMessage = `${error}`;
                    if (errorMessage === 'error: duplicate key value violates unique constraint \"users_email_key\"') { // eslint-disable-line
                        res.status(status = 400).json({
                            status: 400,
                            message: 'A user with that email is already registred', // eslint-disable-line
                        });
                    }
                    res.status(status = 400).json(`${error}`);
                }
            }
        });
    },

    login: async (req, res) => {
        let result = {};// eslint-disable-line
        let status = 200;
        let userNameEmail = '';
        // getting the body for joi validation
        const data = req.body;
        let joySchema;

        // joy validation
        if (req.body.userName) {
            joySchema = joi.object().keys({
                // here we declare all the required fields
                userName: joi.string().required(),
                password: joi.string().required(),
            });
        }
        if (req.body.email) {
            joySchema = joi.object().keys({
            // here we declare all the required fields
                email: joi.string().email().required(),
                password: joi.string().required(),
            });
        }
        joi.validate(data, joySchema, async (err) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    data: {
                        message: err.details[0].message,
                    },
                });
            } else {
                // eslint-disable-next-line no-underscore-dangle
                let _password = '';
                /* seing wether the reqquest contains
                an email or a username */
                if (req.body.userName) {
                    const { userName, password } = req.body;
                    userNameEmail = userName;
                    _password = password;
                }
                if (req.body.email) {
                    const { email, password } = req.body;
                    userNameEmail = email;
                    _password = password;
                }
                try {
                    const tempUser = await findUser(userNameEmail, _password);
                    const token = createToken(tempUser);
                    result.status = status;
                    result.data = [{
                        token,
                    }];
                    res.status(status).json(result);
                } catch (TypeError) {
                    res.status(status = 400).json(
                        res.status(400).json({
                            status: 400,
                            data: {
                                message: 'Username or password incorect',
                            },
                        }),
                    );
                }
            }
        });
    },
    welcomMessage: (req, res) => {
        const status = 200;
        const result = {
            status,
            message: 'Welcome on EPIC-Mail',
        };
        res.status(status).json(result);
    },
};

export default usersController;
