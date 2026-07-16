import { Hono } from 'hono';
import { forgotPasswordController, loginController, registerController } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { registerSchema,loginSchema, forgotPasswordSchema } from './auth.validation.js';


const authRouter = new Hono();

authRouter.post('/register', validate(registerSchema), registerController);
authRouter.post('/login', validate(loginSchema), loginController);
authRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPasswordController)

export default authRouter;