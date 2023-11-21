import mongoose from 'mongoose';

import { ParkingSections } from '../models/ParkingSections.js';

export default async () => {
    await ParkingSections.deleteMany({ _id: { $in: global.ids } });
    await mongoose.connection.close();
};
