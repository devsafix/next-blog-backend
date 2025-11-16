import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginWithEmailAndPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Password is incorrect!");
  }

  // Create JWT Token
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );

  (user as Partial<typeof user>).password = undefined;

  return { user, token };
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  let resultUser;
  if (!user) {
    resultUser = await prisma.user.create({ data });
  } else {
    resultUser = user;
  }

  const token = jwt.sign(
    { id: resultUser.id, role: resultUser.role, email: resultUser.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "30d" }
  );

  (resultUser as Partial<typeof resultUser>).password = undefined;

  return { user: resultUser, token };
};

export const AuthService = {
  loginWithEmailAndPassword,
  authWithGoogle,
};
