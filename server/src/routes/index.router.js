import { Router } from 'express';

import HealthRouter from './health.router.js';
import APIRouter from './api.router.js';

const router = Router();

router.use('/health', HealthRouter);
router.use('/api', APIRouter);

export default router;
