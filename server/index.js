// imports
import 'babel-core/register';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import configs from './config/config';
import routes1 from './routes/v1/index';
import routes2 from './routes/v2/index';
import { createTables } from '../db';
import swaggerDocument from '../swagger.json';
import swaggerDocumentV2 from '../swagger2.json';

dotenv.config();// Sets up dotenv as soon as our application starts

createTables();

// modules initialization
const app = express();
const router1 = express.Router();
const router2 = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = configs.development;

if (environment !== 'production') {
    app.use(logger('dev'));
}

// app uses initializations
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

// Swagger documentation for v2
app.use('/docs/v2', swaggerUI.serve);
app.get('/docs/v2', swaggerUI.setup(swaggerDocumentV2));

// Swagger documentation for v1
app.use('/docs/v1', swaggerUI.serve);
app.get('/docs/v1', swaggerUI.setup(swaggerDocument));


// Router for v2
app.use('/api/v2', routes2(router2));

// Router for v1
app.use('/api/v1', routes1(router1));


app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});


export default app;
