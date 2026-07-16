import { Hono } from 'hono';
import { registerController } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { registerSchema } from './auth.validation.js';


const authRouter = new Hono();

authRouter.post('/register', validate(registerSchema), registerController);

export default authRouter;