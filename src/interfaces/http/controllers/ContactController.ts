import { Request, Response } from "express";
import { ContactRepository } from "../../../infrastructure/repositories/ContactRepository";
import { ContactService } from "../../../application/use-case/user/contactService";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { Types } from "mongoose";

interface AuthenticatedRequest extends Request {
	user?: {
		_id: Types.ObjectId;
	};
}

const contactRepository = new ContactRepository();
const contactService = new ContactService(contactRepository);

export class ContactController {
	static async create(req: AuthenticatedRequest, res: Response) {
		try {
			const { firstName, lastName, phoneNumber } = req.body;
			if (!req.user?._id) {
				errorResponse(res, "Unauthorized! Please login", 401);
				return;
			}
			const createdContact = contactService.createContact(req.user._id, {
				firstName,
				lastName,
				phoneNumber,
			});
			successResponse(res, "Contact Created Sucessfully", createdContact, 201);
		} catch (error) {
			errorResponse(res, "Error creating contact", error, 400);
		}
	}

	static async getAll(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user?._id) {
				errorResponse(res, "Unauthorized! Please login", 401);
				return;
			}
			const contacts = await contactService.getContacts(req.user?._id);
			successResponse(res, "Contacts fetched successfully", contacts);
		} catch (error) {
			errorResponse;
		}
	}

	static async getOne(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user?._id) {
				errorResponse(res, "Unauthorized! Please login", 401);
				return;
			}
			const { id } = req.params;
			const contact = await contactService.getContactById(id, req.user?._id);
			if (!contact) {
				errorResponse(res, "Contact not found", null, 404);
			}
			successResponse(res, "Contact fetched successfully", contact);
		} catch (error) {
			errorResponse(res, "Error fetching contacts", error, 400);
		}
	}

	static async update(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user?._id) {
				errorResponse(res, "Unauthorized! Please login", 401);
				return;
			}
			const { id } = req.params;
			const { firstName, lastName, phoneNumber } = req.body;
			const updateContact = await contactService.updateContact(
				id,
				req.user._id,
				{
					firstName,
					lastName,
					phoneNumber,
				}
			);

			successResponse(res, "Contact updated successfully", updateContact);
		} catch (error) {
			errorResponse(res, "Error updating contact", error);
		}
	}

	static async delete(req: AuthenticatedRequest, res: Response) {
		try {
			if (!req.user?._id) {
				errorResponse(res, "Unauthorized! Please login", 401);
				return;
			}
			const { id } = req.params;
			const success = await contactService.deleteContact(id, req.user._id);
			if (!success) {
				return res.status(404).json({ error: "Contact not found" });
			}
			successResponse(res, "Contact deleted successfully");
		} catch (error) {
			errorResponse(res, "Error deleting contact", error);
		}
	}
}
