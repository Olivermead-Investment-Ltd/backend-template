import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import v1 from './modules/v1';

import doc from './swagger';

const router = Router();

// Controllers
router.use('/docs', swaggerUI.serve, swaggerUI.setup(doc));
router.use('/v1', v1);

router.use('/', async (req, res, next) => {
  return res.send('successful');
});

export default router;
