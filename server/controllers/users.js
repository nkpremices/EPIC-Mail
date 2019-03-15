import jwt from 'jsonwebtoken';
import joi from 'joi';
import { saveUser, findUser } from '../models/users';

// eslint-disable-next-line no-unused-expressions
'use strict';

const createToken = (tempUser) => {
    const playLoad = {
        id: tempUser.id,
        email: tempUser.email,
    };
    const secretKey = process.env.JWT_KEY;
    const options = {
        expiresIn: '30d',
    };
    const token = jwt.sign(playLoad, secretKey, options);
    return token;
};

const signupUser = {
    // sign up part of the users controller
    signup: async (req, res) => {
        const result = {};
        let status = 200;
        // getting the body for joi validation
        const data = req.body;

        // joy validation
        const joySchema = joi.object().keys({
            // here we declare all the required fields
            userName: joi.string().required(),
            password: joi.string().required(),
            email: joi.string().email().required(),
        });

        joi.validate(data, joySchema, async (err) => {
            if (err) {
                res.status(400).json({
                    status: 400,
                    data: {
                        message: 'Ivalid data',
                    },
                });
            } else {
                const { userName, password, email } = req.body;
                try {
                    // trying to insert a user
                    const tempUser = await saveUser(email,
                        userName, '', '', password);
                    const token = createToken(tempUser);
                    result.status = status;
                    result.data = [{
                        token,
                    }];
                    res.status(status).json(result);
                } catch (error) {
                    res.status(status = 500).json(`${error}`);
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
                        message: 'Ivalid data',
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
                    res.status(status = 500).json('Authentication error');
                }
            }
        });
    },

};

export default signupUser;
