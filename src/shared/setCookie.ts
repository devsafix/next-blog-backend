import { Response } from "express";

export interface AuthTokens {
  blogAppToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.blogAppToken) {
    res.cookie("blogAppToken", tokenInfo.blogAppToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 2592000000,
      path: "/",
    });
  }
};
