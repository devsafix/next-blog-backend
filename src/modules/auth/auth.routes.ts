import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/login",
  validateRequest(loginSchema),
  AuthController.loginWithEmailAndPassword
);
router.post("/google", AuthController.authWithGoogle);

export const AuthRouter = router;
