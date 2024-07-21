import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
	user?: {
		_id: string;
	};
}

export const verifyToken = (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ error: "Unauthorized! Please login" });

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET as string) as {
			userId: string;
		};
		req.user = { _id: verified.userId };
		next();
	} catch (error) {
		res.status(400).json({ error: "Invalid token" });
	}
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};
