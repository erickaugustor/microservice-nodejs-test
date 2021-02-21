import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { RequestValidationError, BadRequestError } from '@sgtickets/common';

import { User } from '../models';

const router = express.Router();

const validations = [
  body('email').isEmail().withMessage('Email must be provided'),
  body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be 4 to 20 lenght')
];

router.post ('/api/users/signup', [...validations], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }

  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
  );

  // Store in the session
  req.session = {
    jwt: userJWT,
  };

  res.status(201).send(user);
});

export { router as signupRouter };
