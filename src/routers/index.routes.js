import { Router } from "express";
import signRoutes from './sign.routes.js'

const router = Router();

router.use([signRoutes]);

export default router;
