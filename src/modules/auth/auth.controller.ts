import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../shared/setCookie";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await AuthService.loginWithEmailAndPassword({
      email,
      password,
    });

    setAuthCookie(res, { blogAppToken: result.token });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.authWithGoogle(req.body);

    setAuthCookie(res, { blogAppToken: result.token });

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      user: result.user,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
};

export const AuthController = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
