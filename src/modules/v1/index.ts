import { Router } from 'express';

const router = Router();

router.use('/', async (req, res, next) => {
  return res.send('successful');
});

export default router;
