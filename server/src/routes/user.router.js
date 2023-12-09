import { Router } from 'express';

import * as UserController from '../controllers/user.controller.js';

const router = Router();

router.get('/', UserController.getUser);

export default router;
