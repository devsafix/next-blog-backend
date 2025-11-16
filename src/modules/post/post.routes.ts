import express from "express";
import { PostController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = express.Router();

// ONLY ADMIN can create, update, or delete posts
router.post("/", auth(Role.ADMIN), PostController.createPost);
router.patch("/:id", auth(Role.ADMIN), PostController.updatePost);
router.delete("/:id", auth(Role.ADMIN), PostController.deletePost);

// ANYONE (public) can get posts
router.get("/", PostController.getAllPosts);
router.get("/stats", PostController.getBlogStat);
router.get("/:id", PostController.getPostById);

export const PostRouter = router;
