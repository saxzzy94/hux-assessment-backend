import { Types } from "mongoose";
import { Contact } from "../../../domain/contact/Contact";
import { ContactModel } from "../../database/models/contact.model";
import { IContactRepository } from "../user/IContactRepository";

export class ContactRepository implements IContactRepository {
	async findByUserId(userId: Types.ObjectId): Promise<Contact[]> {
		const contacts = await ContactModel.find({ userId });
		return contacts.map(
			(contact) =>
				new Contact(
					contact.userId,
					contact.firstName,
					contact.lastName,
					contact.phoneNumber,
					contact._id as Types.ObjectId
				)
		);
	}

	async findById(id: string, userId: Types.ObjectId): Promise<Contact | null> {
		const contact = await ContactModel.findOne({ _id: id, userId });
		if (!contact) return null;
		return new Contact(
			contact.userId,
			contact.firstName,
			contact.lastName,
			contact.phoneNumber,
			contact._id as Types.ObjectId
		);
	}

	async create(contact: Contact): Promise<Contact> {
		const newContact = await ContactModel.create(contact);
		return new Contact(
			newContact.userId,
			newContact.firstName,
			newContact.lastName,
			newContact.phoneNumber,
			newContact._id as Types.ObjectId
		);
	}

	async update(
		id: string,
		userId: Types.ObjectId,
		contact: Partial<Contact>
	): Promise<Contact | null> {
		const updatedContact = await ContactModel.findOneAndUpdate(
			{ _id: id, userId },
			contact,
			{ new: true }
		);
		if (!updatedContact) return null;
		return new Contact(
			updatedContact.userId,
			updatedContact.firstName,
			updatedContact.lastName,
			updatedContact.phoneNumber,
			updatedContact._id as Types.ObjectId
		);
	}

	async delete(id: string, userId: Types.ObjectId): Promise<boolean> {
		const result = await ContactModel.deleteOne({ _id: id, userId });
		return result.deletedCount === 1;
	}
}
