import express from 'express';
import helmet from 'helmet';

import APIRouter from './routes/api.router.js';
import HealthRouter from './routes/health.router.js';

// TODO: figure out why the fuck this is necessary
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/////

const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', APIRouter);
app.use('/health', HealthRouter);

export default app;
