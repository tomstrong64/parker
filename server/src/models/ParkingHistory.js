import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';

const ParkingHistorySchema = new Schema(
    {
        zone: { type: Schema.Types.ObjectId, ref: 'parkingZones' }, // zone id
        start: Date, // time the car entered the zone
        end: Date, // time the car left the zone
        until: Date, // time the car must leave the zone,
        notify: Number, // time to notify the user before the parking expires (mins)
        user: { type: Schema.Types.ObjectId, ref: 'users' }, // user id
    },
    {
        timestamps: true,
    }
);

ParkingHistorySchema.virtual('remaining_mins').get(function () {
    return dayjs(this.until).diff(this.start, 'minute');
});

ParkingHistorySchema.virtual('notify_mins').get(function () {
    return dayjs(this.until).subtract(this.notify, 'minute');
});

export const ParkingHistory = mongoose.model(
    'parkingHistory',
    ParkingHistorySchema
);
