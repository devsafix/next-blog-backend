import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { content, postId } = req.body;

    const result = await ReviewService.createReview({
      content,
      post: { connect: { id: postId } },
      author: { connect: { id: userId } },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getReviewsByPostId = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);
    const result = await ReviewService.getReviewsByPostId(postId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const ReviewController = {
  createReview,
  getReviewsByPostId,
};
