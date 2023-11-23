import mongoose from 'mongoose';

import { ParkingZones } from '../models/ParkingZones.js';
import { ParkingHistory } from '../models/ParkingHistory.js';

export default async () => {
    await ParkingHistory.deleteMany({ _id: { $in: global.ids } });
    await ParkingZones.deleteMany({ _id: { $in: global.ids } });
    await mongoose.connection.close();
};
