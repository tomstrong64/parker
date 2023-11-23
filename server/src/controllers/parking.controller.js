import dayjs from 'dayjs';

import { ParkingZones } from '../models/ParkingZones.js';
import { ParkingHistory } from '../models/ParkingHistory.js';

export const getZones = async (req, res, next) => {
    const parkingZone = await ParkingZones.find();
    return res.json(parkingZone);
};

export const createZone = async (req, res, next) => {
    const newZone = await ParkingZones.create(req.body);
    return res.status(201).json(newZone);
};

export const beginParking = async (req, res, next) => {
    const { id } = req.params;
    // check zone exists
    const zone = await ParkingZones.findById(id);
    if (!zone) return res.status(404).json({ error: 'Zone not found' });

    // check when parking would end if started now
    const today = dayjs().format('dddd');
    const now = dayjs();
    let until = now.add(zone.restrictions.time_limit, 'minute');

    // if the 'until' is outside of restrictions, calculate the end time from the start of the next period
    if (
        !zone.restrictions.days.includes(today) ||
        zone.restrictions.end < until.format('HHmm')
    ) {
        // check when restrictions next apply
        let nextDay = now.add(1, 'day');
        while (!zone.restrictions.days.includes(nextDay.format('dddd'))) {
            nextDay = nextDay.add(1, 'day');
        }

        // calculate the end time from the start of the next period
        const nextDayStart = dayjs(
            `${nextDay.format('YYYY-MM-DD')}T${zone.restrictions.start}`
        );
        until = nextDayStart.add(zone.restrictions.time_limit, 'minute');
    }

    // begin parking
    const parking = await ParkingHistory.create({
        zone: id,
        startTime: now,
        until,
    });

    return res.status(200).json({
        endTime: parking.until,
        timeRemaining: parking.timeRemaining,
    });
};

export const checkParking = async (req, res, next) => {
    const zone = await ParkingHistory.findOne({ end: null }).sort({
        createdAt: -1,
    });

    if (!zone) return res.status(404).json({ error: 'No parking found' });

    return res.status(200).json({
        endTime: zone.until,
        timeRemaining: zone.timeRemaining,
    });
};

export const endParking = async (req, res, next) => {
    const zone = await ParkingHistory.findOne({ end: null }).sort({
        createdAt: -1,
    });

    if (!zone) return res.status(404).json({ error: 'No parking found' });

    zone.end = dayjs();
    await zone.save();

    return res.status(200).json({ message: 'Parking ended' });
};
