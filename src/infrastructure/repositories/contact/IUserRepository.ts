import { User } from "../../../domain/user/User";

export interface IUserRepository {
	findByEmail(email: string): Promise<User | null>;
	findById(id: string): Promise<User | null>;
	create(user: User): Promise<void>;
}
