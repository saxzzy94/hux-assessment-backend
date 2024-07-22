import supertest from "supertest";
import express, { Express } from "express";
import mongoose, { Types } from "mongoose";
import { ContactController } from "./contact.controller";
import { ContactService } from "../../../../application/use-case/contact/contact.service";
import { ContactRepository } from "../../../../infrastructure/repositories/contact/ContactRepository";
import { verifyToken } from "../../middleware/auth";

jest.mock("../../../../application/use-case/contact/contact.service");
jest.mock("../../../../infrastructure/repositories/ContactRepository");
jest.mock("../../middleware/auth");

describe("Contact API Integration Tests - Create Contact", () => {
	let app: Express;
	let mockContactService: jest.Mocked<ContactService>;

	beforeAll(async () => {
		app = express();
		app.use(express.json());
		app.post("/contacts", verifyToken, ContactController.create);

		mockContactService = new ContactService(
			new ContactRepository()
		) as jest.Mocked<ContactService>;
		(
			ContactService as jest.MockedClass<typeof ContactService>
		).mockImplementation(() => mockContactService);

		(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
			req.user = { _id: new Types.ObjectId() };
			next();
		});
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	it("should return 201 as status", async () => {
		const response = await supertest(app)
			.post("/contacts")
			.send({ firstName: "John", lastName: "Doe", phoneNumber: "1234567890" })
			.set("Authorization", "fakeToken");

		console.log("Response Body:", response.body);
		expect(response.status).toBe(201);
	});

	it("should return 401 if user is not authenticated", async () => {
		(verifyToken as jest.Mock).mockImplementation((req, res) => {
			res.status(401).json({
				success: false,
				message: "Unauthorized! Please login",
				error: "Unauthorized! Please login",
			});
		});
		const newContact = {
			firstName: "John",
			lastName: "Doe",
			phoneNumber: "1234567890",
		};

		const response = await supertest(app).post("/contacts").send(newContact);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			message: "Unauthorized! Please login",
			error: "Unauthorized! Please login",
		});
	});
});

describe("Contact API Integration Tests - Update Contact", () => {
	let app: Express;
	let mockContactService: jest.Mocked<ContactService>;

	beforeAll(async () => {
		app = express();
		app.use(express.json());
		app.patch("/contacts/:id", verifyToken, ContactController.update);

		mockContactService = new ContactService(
			new ContactRepository()
		) as jest.Mocked<ContactService>;

		(
			ContactService as jest.MockedClass<typeof ContactService>
		).mockImplementation(() => mockContactService);

		(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
			req.user = { _id: new Types.ObjectId() };
			next();
		});
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	it("should return 200 if sucessfully", async () => {
		const userId = new Types.ObjectId();
		const contactId = new Types.ObjectId();
		const updateData = {
			firstName: "Jane",
			lastName: "Doe",
			phoneNumber: "0987654321",
		};

		const updatedContact = {
			id: contactId,
			userId: userId,
			...updateData,
		};
		mockContactService.updateContact.mockResolvedValue(updatedContact);

		const response = await supertest(app)
			.patch(`/contacts/${contactId}`)
			.send(updateData)
			.set("Authorization", "Bearer fakeToken");

		expect(response.status).toBe(200);
	});

	it("should return 401 if user is not authenticated", async () => {
		(verifyToken as jest.Mock).mockImplementation((req, res) => {
			res.status(401).json({
				success: false,
				message: "Unauthorized! Please login",
				error: "Unauthorized! Please login",
			});
		});

		const updateData = {
			firstName: "Jane",
			lastName: "Doe",
			phoneNumber: "0987654321",
		};

		const response = await supertest(app)
			.patch(`/contacts/${new Types.ObjectId()}`)
			.send(updateData);
		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			success: false,
			message: "Unauthorized! Please login",
			error: "Unauthorized! Please login",
		});

		(verifyToken as jest.Mock).mockImplementation((req, res, next) => {
			req.user = { _id: new Types.ObjectId() };
			next();
		});
	});
});
