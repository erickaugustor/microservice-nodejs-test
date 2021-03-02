import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { errorHandler, NotFoundError, currentUser } from '@sgtickets/common';

import cookieSession from 'cookie-session';

import { createTicketRouter } from './routes/new';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUser);

app.use(createTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
