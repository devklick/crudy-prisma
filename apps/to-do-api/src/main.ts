import express from 'express';
import logger from 'morgan';

import userRoute from './routes/user-route';
import todoRoute from './routes/to-do-route';
import config from './config';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/user', userRoute);
app.use('/todo', todoRoute);

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}.`);
});
