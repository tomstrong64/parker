import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';

const ParkingHistorySchema = new Schema(
    {
        zone: { type: Schema.Types.ObjectId, ref: 'parkingZones' }, // zone id
        start: Date, // time the car entered the zone
        end: Date, // time the car left the zone
        until: Date, // time the car must leave the zone
    },
    {
        timestamps: true,
    }
);

ParkingHistorySchema.virtual('timeRemaining').get(function () {
    // return the amount of hours until the endTime
    const minsRemaining = dayjs(this.until).diff(this.start, 'minute');
    const hours = Math.floor(minsRemaining / 60);
    const minutes = minsRemaining % 60;
    return `${hours} hours ${minutes} minutes`;
});

export const ParkingHistory = mongoose.model(
    'parkingHistory',
    ParkingHistorySchema
);
