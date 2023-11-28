import { Router } from 'express';

import * as ParkingZonesController from '../../controllers/parking.controller.js';

const router = Router();

router.get('/', ParkingZonesController.checkParking);
router.get('/zone', ParkingZonesController.getZones);
router.post('/zone', ParkingZonesController.createZone);
router.post('/park/:id', ParkingZonesController.beginParking);
router.put('/park/end', ParkingZonesController.endParking);
router.get('/available', ParkingZonesController.getAvailableZones);

export default router;
