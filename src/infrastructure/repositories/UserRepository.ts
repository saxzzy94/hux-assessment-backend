import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User";
import { UserModel } from "../database/models/UserModel";

export class UserRepository implements IUserRepository {
	async findByEmail(email: string): Promise<User | null> {
		const user = await UserModel.findOne({ email });
		return user ? new User(user.email, user.password, user._id) : null;
	}

	async create(user: User): Promise<void> {
		await UserModel.create(user);
	}
}
