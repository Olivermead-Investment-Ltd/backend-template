import { Router } from 'express';

const router = Router();

// router.get('/api', async (req, res, next) => {
//   return res.json({
//     status: true,
//     message: 'Test API limiter',
//   })
// });

router.use('/', async (req, res, next) => {
  return res.send('successful 2s');
});


export default router;
