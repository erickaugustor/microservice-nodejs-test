import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, BadResquestError } from '../errors/';

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
    throw new BadResquestError('Email in use');
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
});

export { router as signupRouter };
