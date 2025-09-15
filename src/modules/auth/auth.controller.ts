import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const result = await AuthService.loginWithEmailAndPassword({
      email,
      password,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const AuthController = {
  loginWithEmailAndPassword,
};
