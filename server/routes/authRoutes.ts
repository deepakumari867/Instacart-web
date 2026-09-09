import express from "express";
import { syncUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sync", syncUser);

export default authRouter;
