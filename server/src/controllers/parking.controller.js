import dayjs from 'dayjs';

import { ParkingZones } from '../models/ParkingZones.js';

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
    const zone = await ParkingZones.findById(id);
    zone.parked = dayjs().toDate();
    await zone.save();
    return res.status(200).json({
        endTime: zone.endTime,
        timeRemaining: zone.timeRemaining,
    });
};

export const checkParking = async (req, res, next) => {
    const zone = await ParkingZones.findOne({
        parked: { $ne: null },
    }).sort({ parked: -1 });

    return res.status(200).json({
        endTime: zone.endTime,
        timeRemaining: zone.timeRemaining,
    });
};
