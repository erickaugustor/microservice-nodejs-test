import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError, DatabaseConnectionError } from '../errors/';

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
  throw new DatabaseConnectionError();

  res.send({ email, password });
});

export { router as signupRouter };
