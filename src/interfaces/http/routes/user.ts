import express from "express";
import { UserController } from "../controllers/UserController";
import { body } from "express-validator";
import { validate } from "../middleware/auth";

const router = express.Router();

router.post(
	"/signup",
	[
		body("email")
			.isEmail()
			.withMessage("Invalid email format")
			.normalizeEmail(),
		body("password")
			.isLength({ min: 6 })
			.withMessage("Password should be at least 6 chars long"),
	],
	validate,
	UserController.signup
);
router.post("/login",	[
    body("email")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 chars long"),
],
validate, UserController.login);

export default router;