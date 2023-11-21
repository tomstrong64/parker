import express from 'express';

import helmet from 'helmet';

import IndexRouter from './routes/index.router.js';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', IndexRouter);

export default app;
