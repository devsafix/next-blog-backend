import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createReview = async (payload: Prisma.ReviewCreateInput) => {
  return await prisma.review.create({
    data: payload,
    include: {
      author: {
        select: { id: true, name: true, picture: true },
      },
    },
  });
};

const getReviewsByPostId = async (postId: number) => {
  return await prisma.review.findMany({
    where: { postId },
    include: {
      author: {
        select: { id: true, name: true, picture: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const ReviewService = {
  createReview,
  getReviewsByPostId,
};
