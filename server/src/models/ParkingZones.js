import mongoose, { Schema } from 'mongoose';
import dayjs from 'dayjs';

const ParkingZoneSchema = new Schema(
    {
        name: String,
        parked: { type: Date, default: null },
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

ParkingZoneSchema.virtual('endTime').get(function () {
    const parked = dayjs(this.parked);
    const endTime = parked.add(this.restrictions.time_limit, 'minute');

    // if the restrictions end time is before the endTime, calculate the end time from the start of the next period
    if (this.restrictions.end < endTime.format('HHmm')) {
        const nextDay = parked.add(1, 'day');
        const nextDayStart = dayjs(
            `${nextDay.format('YYYY-MM-DD')}T${this.restrictions.start}`
        );
        const nextDayEnd = nextDayStart.add(
            this.restrictions.time_limit,
            'minute'
        );

        return nextDayEnd;
    }

    return endTime;
});

ParkingZoneSchema.virtual('timeRemaining').get(function () {
    const endTime = this.endTime;
    // return the amount of hours until the endTime
    const minsRemaining = endTime.diff(dayjs(), 'minute');
    const hours = Math.floor(minsRemaining / 60);
    const minutes = minsRemaining % 60;
    return `${hours} hours ${minutes} minutes`;
});

export const ParkingZones = mongoose.model('parkingZones', ParkingZoneSchema);
