import { Router } from 'express';

import ParkingRouter from './api/parking.router.js';

const router = Router();

router.use('/parking', ParkingRouter);

export default router;
