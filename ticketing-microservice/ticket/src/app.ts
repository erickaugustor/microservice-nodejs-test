import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError } from '@sgtickets/common';

import cookieSession from 'cookie-session';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
