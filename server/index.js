// imports
import 'babel-core/register';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import configs from './config/config';
import routes from './routes/index';
import swaggerDocument from '../swagger.json';

dotenv.config();// Sets up dotenv as soon as our application starts

// modules initialization
const app = express();
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = configs.development;

if (environment !== 'production') {
    app.use(logger('dev'));
}

// app uses initializations
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

// Swagger documentation
app.use('/docs', swaggerUI.serve);
app.get('/docs', swaggerUI.setup(swaggerDocument));

app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});


export default app;
