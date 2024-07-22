import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../domain/user/User";
import { IUserRepository } from "../../../infrastructure/repositories/contact/IUserRepository";

export class UserService {
	constructor(private userRepository: IUserRepository) {}

	async createUser(email: string, password: string): Promise<void> {
		const existingUser = await this.userRepository.findByEmail(email);
		if (existingUser) {
			throw new Error("Email already exists");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User(email, hashedPassword);
		await this.userRepository.create(user);
	}

	async loginUser(email: string, password: string): Promise<string> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new Error("Invalid email or password");
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			throw new Error("Invalid email or password");
		}
		return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string);
	}

	async loadUser(userId: string) {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = user;
		return rest;
	}
}
