import { createServer } from 'http';
import mongoose from 'mongoose';

import {} from 'dotenv/config';

import app from '../app.js';

console.log(`Starting as ${process.env.NODE_ENV}`);

// connet to db
await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
console.log('MongoDB connected');

// disable autoIndex in production
if (process.env.NODE_ENV === 'production') mongoose.set('autoIndex', false);

// create server
const server = createServer(app);
server.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);

//////////////
// SHUTDOWN //
//////////////

// handle mongoose connection error
mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit(1);
});

// handle mongoose disconnect
mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected');
    process.exit(1);
});

// shutdown server
const gracefulShutdown = () => {
    server.close(async () => {
        console.log('Server closed');
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    });
};

// handle shutdown message
process.on('SIGTERM', () => {
    console.log('SIGTERM received');
    gracefulShutdown();
});

process.on('SIGINT', () => {
    console.log('SIGINT received');
    gracefulShutdown();
});
