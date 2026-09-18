import express from "express";

import { getJobs } from "../controller/jobcontroller.js";
import { login } from "../controller/Login.js";
import { register } from "../controller/register.js";
import { profile } from "../controller/profile.js";
import { logout } from "../controller/logout.js";
import { authmiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", getJobs);

router.get("/profile", authmiddleware, profile);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;