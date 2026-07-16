import { Hono } from 'hono';
import { loginController, registerController } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { registerSchema,loginSchema } from './auth.validation.js';


const authRouter = new Hono();

authRouter.post('/register', validate(registerSchema), registerController);
authRouter.post('/login', validate(loginSchema), loginController);

export default authRouter;