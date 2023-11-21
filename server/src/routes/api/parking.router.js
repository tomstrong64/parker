import { Router } from 'express';

import * as ParkingSectionsController from '../../controllers/parking.controller.js';

const router = Router();

router.get('/', ParkingSectionsController.checkParking);
router.get('/zone', ParkingSectionsController.getSections);
router.post('/zone', ParkingSectionsController.createSection);
router.post('/park/:id', ParkingSectionsController.beginParking);

export default router;
