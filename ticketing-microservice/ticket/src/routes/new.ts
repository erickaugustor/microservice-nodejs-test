import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@sgtickets/common';
import { Ticket } from '../models/ticket';

const router = express.Router();

const emailValidation = body('title')
  .not().isEmpty()
  .withMessage('Title is required');

const priceValidation = body('price')
  .isFloat({ gt: 0})
  .withMessage('Price must be greater than 0');

const validations = [emailValidation, priceValidation];

router.post('/api/tickets', requireAuth, validations, validateRequest, async (req: Request, res: Response) => {
    
  const { title, price } = req.body;

  const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id,
  });

  await ticket.save();

  res.sendStatus(200).send(ticket);
  },
);

export { router as createTicketRouter };
