import mongoose from 'mongoose';

import { ParkingZones } from '../models/ParkingZones.js';

export default async () => {
    await ParkingZones.deleteMany({ _id: { $in: global.ids } });
    await mongoose.connection.close();
};
