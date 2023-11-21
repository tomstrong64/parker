import {} from 'dotenv/config';
import mongoose from 'mongoose';
import app from '../app.js';

export default async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    global.app = app;
    global.ids = [];
};
