export declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: number; role: Role };
    }
  }
}
