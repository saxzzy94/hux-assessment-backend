import { Types } from "mongoose";
import { Contact } from "../../../domain/contact/Contact";

export interface IContactRepository {
	findByUserId(userId: Types.ObjectId): Promise<Contact[]>;

	findById(id: string, userId: Types.ObjectId): Promise<Contact | null>;

	create(contact: Contact): Promise<Contact>;

	update(
		id: string,
		userId: Types.ObjectId,
		contact: Partial<Contact>
	): Promise<Contact | null>;

	delete(id: string, userId: Types.ObjectId): Promise<boolean>;
}
