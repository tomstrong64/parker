import { Router } from 'express';

import * as ParkingZonesController from '../../controllers/parking.controller.js';

const router = Router();

router.get('/status', ParkingZonesController.checkParking);
router.get('/zone', ParkingZonesController.getZones);
router.post('/zone', ParkingZonesController.createZone);
router.post('/start/:id', ParkingZonesController.beginParking);
router.put('/end', ParkingZonesController.endParking);
router.get('/available', ParkingZonesController.getAvailableZones);

export default router;
