import {Router, json} from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, logoutUserController, refreshUserController, requestResetEmailController, resetPasswordController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRoutes = Router();
const jsonParser = json();
authRoutes.post(
  '/register',
  jsonParser,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRoutes.post(
  "/login", 
  jsonParser, 
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController)
);

authRoutes.post("/logout", ctrlWrapper(logoutUserController));

authRoutes.post("/refresh", ctrlWrapper(refreshUserController));

authRoutes.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRoutes.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRoutes;
