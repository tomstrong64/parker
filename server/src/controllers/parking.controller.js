import dayjs from 'dayjs';

import { ParkingSections } from '../models/ParkingSections.js';

export const getSections = async (req, res, next) => {
    const parkingSection = await ParkingSections.find();
    return res.json(parkingSection);
};

export const createSection = async (req, res, next) => {
    const newSection = await ParkingSections.create(req.body);
    return res.status(201).json(newSection);
};

export const beginParking = async (req, res, next) => {
    const { id } = req.params;
    const section = await ParkingSections.findById(id);
    section.parked = dayjs().toDate();
    await section.save();
    return res
        .status(200)
        .json({
            endTime: section.endTime,
            timeRemaining: section.timeRemaining,
        });
};

export const checkParking = async (req, res, next) => {
    const section = await ParkingSections.findOne({
        parked: { $ne: null },
    }).sort({ parked: -1 });

    return res
        .status(200)
        .json({
            endTime: section.endTime,
            timeRemaining: section.timeRemaining,
        });
};
