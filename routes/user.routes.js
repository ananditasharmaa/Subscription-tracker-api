import { Router } from "express";
import { getUser, getUsers, createUser, updateUser, deleteUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// 1. GET all users
userRouter.get("/", getUsers);

// 2. GET one user by ID
userRouter.get("/:id", authorize, getUser);

// 3. CREATE a user
userRouter.post("/", createUser);

// 4. UPDATE a user
userRouter.put("/:id", authorize, updateUser);

// 5. DELETE a user
userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;