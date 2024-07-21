import express from "express";
import { body } from "express-validator";
import { validate, verifyToken } from "../middleware/auth";
import { ContactController } from "../controllers/ContactController";

const router = express.Router();

router.post(
	"/contacts",
	verifyToken,
	[
		body("firstName")
			.isString()
			.isLength({ min: 2 })
			.withMessage("First Name Should be more than 2 characters"),
		body("lastName")
			.isString()
			.isLength({ min: 2 })
			.withMessage("Last Name Should be more than 2 characters"),
	],
	validate,
	ContactController.create
);

router.get("/contacts", verifyToken, ContactController.getAll);
router.get("/contacts/:id", verifyToken, ContactController.getOne);
router.put("/contacts/:id", verifyToken, ContactController.update);
router.delete("/contacts/:id", verifyToken, ContactController.delete);

export default router;

