import { Router } from "express";
import {signRoutes} from './sign.routes.js'

export const routes = Router();

routes.use([signRoutes]);
