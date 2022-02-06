import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import userController from './controller/user-controller';
import todoController from './controller/todo-controller';
import apiConfig from './config/api-config';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userController);
app.use('/todo', todoController);

app.listen(apiConfig.port, () => {
	console.log(`Running on port ${apiConfig.port}.`);
});
