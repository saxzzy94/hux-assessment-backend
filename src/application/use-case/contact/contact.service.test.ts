import { Types } from "mongoose";
import { Contact } from "../../../domain/contact/Contact";
import { ContactService } from "./contact.service";
import { IContactRepository } from "../../../infrastructure/repositories/user/IContactRepository";

const mockContactRepository: IContactRepository = {
	create: jest
		.fn()
		.mockResolvedValue(
			new Contact(new Types.ObjectId(), "Osazee", "Agbonze", "1234567890")
		),
	findByUserId: jest.fn(),
	findById: jest.fn(),
	update: jest
		.fn()
		.mockResolvedValue(
			new Contact(new Types.ObjectId(), "John", "Doe", "1234567890")
		),
	delete: jest.fn(),
};

describe("ContactService", () => {
	it("should create a contact when valid userId and complete contactData are provided", async () => {
		const contactService = new ContactService(mockContactRepository);
		const userId = new Types.ObjectId();
		const contactData = {
			firstName: "Osazee",
			lastName: "Agbonze",
			phoneNumber: "1234567890",
		};

		const result = await contactService.createContact(userId, contactData);

		expect(mockContactRepository.create).toHaveBeenCalledWith(
			expect.any(Contact)
		);
		expect(result).toEqual(expect.objectContaining(contactData));
	});

	it("should successfully update a contact with valid id, userId, and contactData", async () => {
		const contactService = new ContactService(mockContactRepository);
		const id = "validId";
		const userId = new Types.ObjectId();
		const contactData = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "1234567890",
		};

		const result = await contactService.updateContact(id, userId, contactData);

		expect(mockContactRepository.update).toHaveBeenCalledWith(
			id,
			userId,
			contactData
		);
		expect(result).toEqual(expect.objectContaining(contactData));
	});
});
