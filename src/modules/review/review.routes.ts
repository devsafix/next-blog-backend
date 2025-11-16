import express from "express";
import { ReviewController } from "./review.controller";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

router.post("/", auth(Role.USER, Role.ADMIN), ReviewController.createReview);

router.get("/:postId", ReviewController.getReviewsByPostId);

export const ReviewRouter = router;
