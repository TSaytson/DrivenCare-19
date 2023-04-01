import express from 'express';
import cors from 'cors';
import routes from './routers/index.routes.js';
const server = express();

server.use(cors())
    .use(express.json())
    .use(routes);