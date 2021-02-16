import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadResquestError } from '../errors';

import { validateRequest } from '../middlerware';
import { User } from '../models';
import { Password } from '../services';

const router = express.Router();

const validations = [
  body('email').isEmail().withMessage('Email must be provided'),
  body('password').trim().notEmpty().withMessage('Password must be 4 to 20 lenght')
];

router.post('/api/users/signin', validations, validateRequest, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadResquestError('Invalid credentials');
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadResquestError('Invalid credentials');
  }

  // Generate JWT
  const userJWT = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,
  );

  // Store in the session
  req.session = {
    jwt: userJWT,
  };

  res.status(200).send(existingUser);
});

export { router as signinRouter };
