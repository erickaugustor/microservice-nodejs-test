import express, { Request, Response } from 'express';

import { currentUser } from '@sgtickets/common';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
