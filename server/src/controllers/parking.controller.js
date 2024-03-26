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
    // TODO: check id is valid
    const { id } = req.params;
    // check zone exists
    const zone = await ParkingZones.findById(id);
    if (!zone) return res.status(404).json({ error: 'Zone not found' });

    // get current day
    const now = dayjs();
    const currentDay = now.format('dddd');

    // add time limit to current time
    let until = now.add(zone.restrictions.time_limit, 'minute');
    let untilDay = until.format('dddd');

    // if the 'until' is outside of restrictions, calculate the end time from the start of the next period
    if (
        currentDay !== untilDay || // if not the same day
        !zone.restrictions.days.includes(untilDay) || // if not a restricted day
        zone.restrictions.end < until.format('HHmm') // if outside of restricted time on the same day
    ) {
        // error if days are not set
        if (!zone.restrictions.days.length)
            return res.status(400).json({ error: 'No days set' });

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
        user: req.user._id,
        zone: id,
        startTime: now,
        until,
    });

    return res.status(200).json({
        end_time: parking.until,
        remaining_mins: parking.remaining_mins,
        notify_mins: parking.notify_mins,
        zone: zone.name,
    });
};

export const checkParking = async (req, res, next) => {
    const parking = await ParkingHistory.findOne({
        user: req.user._id,
        end: null,
    })
        .sort({
            createdAt: -1,
        })
        .populate('zone');

    if (!parking) return res.status(404).json({ error: 'No parking found' });

    return res.status(200).json({
        end_time: parking.until,
        remaining_mins: parking.remaining_mins,
        notify_mins: parking.notify_mins,
        zone: parking.zone.name,
    });
};

export const endParking = async (req, res, next) => {
    const zone = await ParkingHistory.findOne({
        user: req.user._id,
        end: null,
    }).sort({
        createdAt: -1,
    });

    if (!zone) return res.status(404).json({ error: 'No parking found' });

    zone.end = dayjs();
    await zone.save();

    return res.status(200).json({ message: 'Parking ended' });
};

export const getAvailableZones = async (req, res, next) => {
    const parkingToday = await ParkingHistory.find({
        user: req.user._id,
        end: { $gte: dayjs().startOf('day') },
    });

    const usedZones = parkingToday.map((parking) => parking.zone);

    const availableZones = await ParkingZones.find({
        _id: { $nin: usedZones },
    });

    return res.status(200).json(
        availableZones.map((zone) => ({
            _id: zone._id,
            name: zone.name,
            lat: zone.lat,
            lon: zone.lon,
        }))
    );
};
