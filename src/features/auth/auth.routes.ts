import { Hono } from 'hono';
import { forgotPasswordController, getProfileController, loginController, registerController, resetPasswordController, updateProfileController } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { registerSchema,loginSchema, forgotPasswordSchema, resetPasswordSchema, updateProfileSchema } from './auth.validation.js';
import {auth} from '../../middlewares/auth.js';

const authRouter = new Hono();

authRouter.post('/register', validate(registerSchema), registerController);
authRouter.post('/login', validate(loginSchema), loginController);
authRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPasswordController);
authRouter.post('/reset-password', validate(resetPasswordSchema), resetPasswordController );
authRouter.get('/profile', auth, getProfileController)
authRouter.put('/profile',auth, validate(updateProfileSchema), updateProfileController)


export default authRouter;