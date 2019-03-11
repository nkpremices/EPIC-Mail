// imports
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { development } from './configs/configs.routes';
import { routes } from './routes/index';

dotenv.config();// Sets up dotenv as soon as our application starts

// modules initialization
const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = development;

// app uses initializations
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use('/api/v1', routes(router));

if (environment !== 'production') {
    app.use(logger('dev'));
}

if (stage.port) {
    app.listen(`${stage.port}`, () => {
        console.log(`Server now listening at localhost:${stage.port}`);
    });
}

export default app;
