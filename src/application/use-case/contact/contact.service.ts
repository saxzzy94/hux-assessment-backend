import { Types } from "mongoose";
import { ContactRepository } from "../../../infrastructure/repositories/ContactRepository";
import { Contact } from "../../../domain/contact/Contact";

export class ContactService {
	constructor(private contactRepository: ContactRepository) {}

	async createContact(
		userId: Types.ObjectId,
		contactData: Partial<Contact>
	): Promise<Contact> {
		const contact = new Contact(
			userId,
			contactData.firstName!,
			contactData.lastName!,
			contactData.phoneNumber!
		);
		return await this.contactRepository.create(contact);
	}

	async getContacts(userId: Types.ObjectId): Promise<Contact[]> {
		return await this.contactRepository.findByUserId(userId);
	}

	async updateContact(
		id: string,
		userId: Types.ObjectId,
		contactData: Partial<Contact>
	): Promise<Contact | null> {
		return await this.contactRepository.update(id, userId, contactData);
	}

	async deleteContact(id: string, userId: Types.ObjectId): Promise<boolean> {
		return await this.contactRepository.delete(id, userId);
	}

	async getContactById(
		id: string,
		userId: Types.ObjectId
	): Promise<Contact | null> {
		return await this.contactRepository.findById(id, userId);
	}
}
