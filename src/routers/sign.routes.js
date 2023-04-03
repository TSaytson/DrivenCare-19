import { Router } from "express";
import { signController } from "../controllers/sign.controller.js";
import { schemaValidation } from "../middlewares/schema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/sign.schemas.js";

export const signRoutes = Router();

signRoutes.post('/signIn', schemaValidation(signInSchema), signController.signIn);
signRoutes.post('/signUp', schemaValidation(signUpSchema), signController.signUp);

