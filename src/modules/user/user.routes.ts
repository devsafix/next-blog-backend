import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserSchema } from "./user.validation";

const router = express.Router();

router.post("/", validateRequest(createUserSchema), UserController.createUser);
router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getUserById);
router.patch("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export const UserRouter = router;
