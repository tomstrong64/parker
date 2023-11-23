import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';

const ParkingZoneSchema = new Schema(
    {
        name: String,
        lat: Number,
        lon: Number,
        restrictions: {
            time_limit: Number, // minutes
            days: [String], // days of the week
            start: String, // 0000-2400
            end: String, // 0000-2400
            no_return: String, // human interval format
        },
    },
    {
        timestamps: true,
    }
);

export const ParkingZones = mongoose.model('parkingZones', ParkingZoneSchema);
