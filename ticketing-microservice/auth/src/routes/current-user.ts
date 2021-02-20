import express, { Request, Response } from 'express';

import { currentUser } from '@erickaugustoramos/common/errors';

const router = express.Router();

router.get('/api/users/currentUser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
