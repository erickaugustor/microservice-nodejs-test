import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout'
import { signinRouter } from './routes/signin';

import { errorHandler } from './middlerware/error-habdler';

import { NotFoundError } from './errors/not-found';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to the mongo!');
  } catch(err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listen on port 3000');
  });
};

start();
