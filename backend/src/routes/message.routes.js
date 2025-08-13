import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { getUsers,getMessages } from "../controllers/message.controllers.js";

const router=express.Router()

router.get("/users",protectRoute,getUsers);
router.get("/:id",protectRoute,getMessages)

export default router;