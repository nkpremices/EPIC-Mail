// imports
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { config } from 'dotenv'; // Sets up dotenv as soon as our application starts
import { development } from './configs/configs.routes';

// modules initialization
const app = express();
const router = express.Router();
const environment = process.env.NODE_ENV; // development
const stage = config;
const PORT = process.env.PORT || 3000;

// app uses initializations
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/v1', (req, res, next) => {
    res.send('Hello');
    next();
});

if (stage.port) {
    app.listen(`${stage.port}`, () => {
        console.log(`Server now listening at localhost:${stage.port}`);
    });
} else {
    app.listen(`${PORT}`, () => {
        console.log(`Server now listening at localhost:${PORT}`);
    });
}

export default app;
