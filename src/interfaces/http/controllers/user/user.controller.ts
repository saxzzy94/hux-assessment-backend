import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/apiResponse";
import { UserService } from "../../../../application/use-case/user/user.service";
import { UserRepository } from "../../../../infrastructure/repositories/user/UserRepository";

interface AuthenticatedRequest extends Request {
	user?: {
		_id: string;
	};
}

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export class UserController {
	static async signup(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			await userService.createUser(email, password);
			successResponse(res, "User created successfully", null, 201);
		} catch (error) {
			errorResponse(res, "Error creating user", error);
		}
	}

	static async login(req: Request, res: Response): Promise<void> {
		try {
			const { email, password } = req.body;
			const token = await userService.loginUser(email, password);
			successResponse(res, "Login successful", { token });
		} catch (error) {
			errorResponse(res, "Error login In", error, 400);
		}
	}

	static async load(req: AuthenticatedRequest, res: Response): Promise<void> {
		try {
			const userId = req.user?._id;
			if (!userId) {
				throw new Error("Unauthorized! Please login");
			}
			const user = await userService.loadUser(userId);
			successResponse(res, "Fetching User successful", { user });
		} catch (error) {
			errorResponse(res, "Error Fetching User", error, 400);
		}
	}
}
